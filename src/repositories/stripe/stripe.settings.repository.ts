import Stripe from 'stripe';
import { CreateCheckOutSession, StripeRepository, UpdateCustomer } from '../stripe.repository';
import { env } from '../../env';

export class StripeSettingsRepository implements StripeRepository {
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
      subscription_data: {
        metadata: {
          user_id: data.user.id,
        },
      },
    });

    return session.url;
  }

  async updateCostumer(id: string, data: Partial<UpdateCustomer>) {
    await this.stripe.customers.update(id, {
      email: data.email,
      name: data.name,
    });
  }
}
