import { PrismaSubscriptionsRepository } from '../../../../repositories/prisma/prisma.subscriptions.repository';
import { UpdateSubscriptionUseCase } from '../../../subscription/update';

export function makeUpdateSubscription() {
  const subscriptionsRepository = new PrismaSubscriptionsRepository();
  const useCase = new UpdateSubscriptionUseCase(subscriptionsRepository);

  return useCase;
}
