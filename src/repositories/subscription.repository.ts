import { Prisma, Subscription } from '@prisma/client';

export interface SubscriptionsRepository {
  create(data: Prisma.SubscriptionUncheckedCreateInput): Promise<Subscription>;
}
