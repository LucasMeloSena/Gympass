import { Prisma, Subscription } from '@prisma/client';
import { SubscriptionsRepository } from '../subscription.repository';
import { prisma } from '../../utils/database';

export class PrismaSubscriptionsRepository implements SubscriptionsRepository {
  async findByUserId(userId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: {
        user_id: userId,
      },
    });
    return subscription;
  }

  async create(data: Prisma.SubscriptionUncheckedCreateInput) {
    const subscription = await prisma.subscription.create({
      data,
    });
    return subscription;
  }

  async update(data: Subscription) {
    const updatedSubscription = await prisma.subscription.update({
      where: {
        subscription_id: data.subscription_id,
      },
      data,
    });
    return updatedSubscription;
  }

  async findByStripeId(subscription_id: string) {
    const subscription = await prisma.subscription.findUnique({
      where: {
        subscription_id,
      },
    });
    return subscription;
  }
}
