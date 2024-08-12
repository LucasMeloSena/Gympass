import { PrismaSubscriptionsRepository } from '../../../../repositories/prisma/prisma.subscriptions.repository';
import { VerifySubscriptionStatusUseCase } from '../../../subscription/verify-status';

export function makeVerifySubscriptionStatus() {
  const subscriptionRepository = new PrismaSubscriptionsRepository();
  const useCase = new VerifySubscriptionStatusUseCase(subscriptionRepository);

  return useCase;
}
