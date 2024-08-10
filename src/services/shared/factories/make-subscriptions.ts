import { PrismaSubscriptionsRepository } from '../../../repositories/prisma/prisma.subscriptions.repository';
import { CreateSubscriptionUseCase } from '../../subscription/create';

export function makeCreateSubscription() {
  const subscriptionsRepository = new PrismaSubscriptionsRepository();
  const useCase = new CreateSubscriptionUseCase(subscriptionsRepository);

  return useCase;
}
