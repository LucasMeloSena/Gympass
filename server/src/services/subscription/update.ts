import { Subscription, SubscriptionStatus } from '@prisma/client';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';
import { SubscriptionsRepository } from '../../repositories/subscription.repository';

interface UpdateSubscriptionUseCaseRequest {
  subscriptionId: string;
  status: SubscriptionStatus;
}

interface UpdateSubscriptionUseCaseResponse {
  subscription: Subscription;
}

export class UpdateSubscriptionUseCase {
  constructor(private subscriptionRepository: SubscriptionsRepository) {}

  async execute({ subscriptionId, status }: UpdateSubscriptionUseCaseRequest): Promise<UpdateSubscriptionUseCaseResponse> {
    const subscription = await this.subscriptionRepository.findByStripeId(subscriptionId);

    if (!subscription) throw new ResourceNotFoundError();

    subscription.status = status;
    await this.subscriptionRepository.update(subscription);

    return {
      subscription,
    };
  }
}
