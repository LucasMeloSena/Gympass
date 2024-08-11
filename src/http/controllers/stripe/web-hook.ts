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
      case 'invoice.payment_succeeded': {
        console.log(event.data.object);
        const userId = event.data.object.metadata?.user_id;
        if (!userId) throw new Error();

        paymentsUseCase.execute({
          payment_id: event.data.object.id,
          amount: event.data.object.amount_paid / 100,
          status: PaymentStatus.SUCCESSED,
          user_id: userId,
        });
        subscriptionUseCase.execute({
          user_id: userId,
          status: SubscriptionStatus.ACTIVE,
        });
        break;
      }
      case 'invoice.payment_failed': {
        const userId = event.data.object.metadata?.user_id;
        if (!userId) throw new Error();

        paymentsUseCase.execute({
          payment_id: event.data.object.id,
          amount: event.data.object.amount_paid / 100,
          status: PaymentStatus.FAILED,
          user_id: userId,
        });
        break;
      }
      default:
        console.error(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
    next(err);
  }
}
