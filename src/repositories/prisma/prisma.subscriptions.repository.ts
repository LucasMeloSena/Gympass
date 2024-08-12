import { Prisma } from '@prisma/client';
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
}
