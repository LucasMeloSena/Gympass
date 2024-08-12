import { Prisma, Subscription } from '@prisma/client';

export interface SubscriptionsRepository {
  create(data: Prisma.SubscriptionUncheckedCreateInput): Promise<Subscription>;
  findByUserId(userId: string): Promise<Subscription | null>;
  update(subscription: Subscription): Promise<Subscription>;
}
