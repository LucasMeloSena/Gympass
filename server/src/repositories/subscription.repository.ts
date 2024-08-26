import { Prisma, Subscription } from '@prisma/client';

export interface SubscriptionsRepository {
  create(data: Prisma.SubscriptionUncheckedCreateInput): Promise<Subscription>;
  findByUserId(userId: string): Promise<Subscription | null>;
  findByStripeId(subscription_id: string): Promise<Subscription | null>;
  update(data: Subscription): Promise<Subscription>;
}
