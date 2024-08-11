import Stripe from 'stripe';
import { CreateCheckOutSession, StripeRepository } from '../stripe.repository';
import { env } from '../../env';
import { ActiveSubscriptionError } from '../../services/shared/errors/active-subscription.error';

export class CheckOutStripeRepository implements StripeRepository {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(env.STRIPE_KEY);
  }

  async createCheckOutSession(data: CreateCheckOutSession) {
    const existingCustomer = await this.stripe.customers.list({
      email: data.user.email,
      limit: 1,
    });

    let customerId: string;
    if (existingCustomer.data.length === 0) {
      const custumer = await this.stripe.customers.create({
        email: data.user.email,
        name: data.user.name,
      });
      customerId = custumer.id;
    } else {
      customerId = existingCustomer.data[0].id;
    }

    const subscriptions = await this.stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
    });

    const existingSubscription = subscriptions.data.find((subscription) => subscription.items.data.some((item) => item.price.id === env.PRICE_ID));

    if (existingSubscription) {
      throw new ActiveSubscriptionError();
    }

    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: env.PRICE_ID,
          quantity: data.quantity,
        },
      ],
      mode: 'subscription',
      success_url: data.success_url,
      cancel_url: data.cancel_url,
      payment_intent_data: {
        metadata: {
          user_id: data.user.id,
        },
      },
    });

    return session.url;
  }
}
