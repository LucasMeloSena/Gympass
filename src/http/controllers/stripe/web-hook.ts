import { PaymentStatus, SubscriptionStatus } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import { makeCreatePayments } from '../../../services/shared/factories/make-payments';
import { makeCreateSubscription } from '../../../services/shared/factories/make-subscriptions';
import { env } from '../../../env';

export async function webHook(req: Request, res: Response, next: NextFunction) {
  try {
    const stripe = new Stripe(env.STRIPE_KEY);
    const signature = req.headers['stripe-signature'];
    if (!signature) {
      throw new Error();
    }
    const event = stripe.webhooks.constructEvent(req.body, signature, env.ENDPOINT_SECRET);
    const paymentsUseCase = makeCreatePayments();
    const subscriptionUseCase = makeCreateSubscription();

    switch (event.type) {
      case 'invoice.payment_succeeded':
        console.log(event.data.object);
        paymentsUseCase.execute({
          payment_id: event.data.object.id,
          amount: event.data.object.amount_received,
          status: PaymentStatus.SUCCESSED,
          user_id: event.data.object.metadata.user_id,
        });
        subscriptionUseCase.execute({
          user_id: event.data.object.metadata.user_id,
          status: SubscriptionStatus.ACTIVE,
        });
        break;
      case 'invoice.payment_failed':
        paymentsUseCase.execute({
          payment_id: event.data.object.id,
          amount: event.data.object.amount_received,
          status: PaymentStatus.FAILED,
          user_id: event.data.object.metadata.user_id,
        });
        break;
      default:
        console.error(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    next(err);
  }
}
