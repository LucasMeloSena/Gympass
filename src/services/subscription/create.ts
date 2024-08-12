import { Subscription, SubscriptionStatus } from '@prisma/client';
import { SubscriptionsRepository } from '../../repositories/subscription.repository';

export interface CreateSubscriptionUseCaseRequest {
  subscription_id: string;
  user_id: string;
  status: SubscriptionStatus;
}

export interface CreateSubscriptionUseCaseResponse {
  subscription: Subscription;
}

export class CreateSubscriptionUseCase {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  async execute({ status, user_id, subscription_id }: CreateSubscriptionUseCaseRequest): Promise<CreateSubscriptionUseCaseResponse> {
    const subscription = await this.subscriptionsRepository.create({ status, user_id, subscription_id });
    return { subscription };
  }
}
