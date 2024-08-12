import { Prisma, Subscription } from '@prisma/client';
import { SubscriptionsRepository } from '../subscription.repository';
import { randomUUID } from 'node:crypto';

export class InMemorySubscriptionsRepository implements SubscriptionsRepository {
  private items: Subscription[] = [];

  async findByUserId(userId: string) {
    const subscription = this.items.find((item) => item.user_id === userId);
    if (!subscription) return null;
    return subscription;
  }

  async create(data: Prisma.SubscriptionUncheckedCreateInput) {
    const subscription = {
      id: data.id ?? randomUUID(),
      subscription_id: data.subscription_id,
      status: data.status,
      created_at: new Date(),
      user_id: data.user_id,
    };
    this.items.push(subscription);
    return subscription;
  }

  async update(data: Subscription) {
    const subscriptionIndex = this.items.findIndex((item) => item.id === data.id);
    if (subscriptionIndex >= 0) {
      this.items[subscriptionIndex] = data;
    }
    return this.items[subscriptionIndex];
  }

  async findByStripeId(subscription_id: string) {
    const subscription = this.items.find((item) => item.subscription_id === subscription_id);
    if (!subscription) return null;
    return subscription;
  }
}
