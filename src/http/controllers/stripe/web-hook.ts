import { PaymentStatus, SubscriptionStatus } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import { makeCreatePayments } from '../../../services/shared/factories/payment/make-payments';
import { makeCreateSubscription } from '../../../services/shared/factories/subscription/make-subscriptions';
import { env } from '../../../env';
import { ResourceNotFoundError } from '../../../services/shared/errors/resource-not-found.error';
import { makeUpdateSubscription } from '../../../services/shared/factories/subscription/make-update';

export async function webHook(req: Request, res: Response, next: NextFunction) {
  try {
    const stripe = new Stripe(env.STRIPE_KEY);
    const signature = req.headers['stripe-signature'];
    if (!signature) {
      throw new ResourceNotFoundError();
    }
    const event = stripe.webhooks.constructEvent(req.body, signature, env.ENDPOINT_SECRET);
    const createPaymentsUseCase = makeCreatePayments();
    const createSubscriptionUseCase = makeCreateSubscription();
    const updateSubscriptionUseCase = makeUpdateSubscription();

    switch (event.type) {
      case 'invoice.payment_succeeded': {
        const userId = event.data.object.subscription_details?.metadata?.user_id;
        if (!userId) throw new ResourceNotFoundError();

        const existingSubscription = await stripe.subscriptions.list({
          customer: event.data.object.customer?.toString(),
          limit: 1,
        });

        if (existingSubscription) {
          await updateSubscriptionUseCase.execute({ subscriptionId: existingSubscription.data[0].id, status: SubscriptionStatus.ACTIVE });

          await createPaymentsUseCase.execute({
            payment_id: event.data.object.id,
            amount: event.data.object.amount_paid / 100,
            status: PaymentStatus.SUCCESSED,
            user_id: userId,
            subscription_id: existingSubscription.data[0].id,
          });
        } else {
          const newStripeSubscription = event.data.object.subscription;
          console.log(newStripeSubscription);
          if (!newStripeSubscription) throw new ResourceNotFoundError();
          const { subscription } = await createSubscriptionUseCase.execute({
            user_id: userId,
            subscription_id: newStripeSubscription.toString(),
            status: SubscriptionStatus.ACTIVE,
          });

          await createPaymentsUseCase.execute({
            payment_id: event.data.object.id,
            amount: event.data.object.amount_paid / 100,
            status: PaymentStatus.SUCCESSED,
            user_id: userId,
            subscription_id: subscription.id,
          });
        }
        break;
      }
      case 'invoice.payment_failed': {
        const userId = event.data.object.subscription_details?.metadata?.user_id;
        if (!userId) throw new ResourceNotFoundError();

        const subscription = event.data.object.subscription;
        if (!subscription) {
          await createPaymentsUseCase.execute({
            payment_id: event.data.object.id,
            amount: event.data.object.amount_paid / 100,
            status: PaymentStatus.FAILED,
            user_id: userId,
            subscription_id: null,
          });
        } else {
          await updateSubscriptionUseCase.execute({ subscriptionId: subscription.toString(), status: SubscriptionStatus.UNPAID });

          await createPaymentsUseCase.execute({
            payment_id: event.data.object.id,
            amount: event.data.object.amount_paid / 100,
            status: PaymentStatus.FAILED,
            user_id: userId,
            subscription_id: subscription.toString(),
          });
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const subscriptionId = event.data.object.id;
        await updateSubscriptionUseCase.execute({ subscriptionId, status: SubscriptionStatus.CANCELED });
        break;
      }
      default:
        console.error(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(400).json({ message: err.message });
    }
    next(err);
  }
}
