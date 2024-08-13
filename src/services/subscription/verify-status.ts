import { Subscription, SubscriptionStatus } from '@prisma/client';
import { SubscriptionsRepository } from '../../repositories/subscription.repository';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';

export interface VerifyStatusRequest {
  userId: string;
}

export interface VerifyStatusResponse {
  subscription: Subscription;
  isValid: boolean;
}

export class VerifySubscriptionStatusUseCase {
  constructor(private subscriptionRepository: SubscriptionsRepository) {}

  async execute({ userId }: VerifyStatusRequest): Promise<VerifyStatusResponse> {
    const subscription = await this.subscriptionRepository.findByUserId(userId);

    if (!subscription) throw new ResourceNotFoundError();

    const isValid = subscription.status === SubscriptionStatus.ACTIVE;
    return {
      subscription,
      isValid,
    };
  }
}
