import { Prisma, Subscription } from '@prisma/client';
import { SubscriptionsRepository } from '../subscription.repository';
import { randomUUID } from 'node:crypto';

export class InMemorySubscriptionsRepository implements SubscriptionsRepository {
  private items: Subscription[] = [];

  async create(data: Prisma.SubscriptionUncheckedCreateInput) {
    const subscription = {
      id: data.id ?? randomUUID(),
      status: data.status,
      created_at: new Date(),
      user_id: data.user_id,
    };
    this.items.push(subscription);
    return subscription;
  }
}
