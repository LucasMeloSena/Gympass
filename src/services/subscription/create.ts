import { SubscriptionStatus } from '@prisma/client';
import { SubscriptionsRepository } from '../../repositories/subscription.repository';

export interface CreateSubscriptionUseCaseRequest {
  user_id: string;
  status: SubscriptionStatus;
}

export interface CreateSubscriptionUseCaseResponse {
  user_id: string;
  status: SubscriptionStatus;
}

export class CreateSubscriptionUseCase {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  async execute({ status, user_id }: CreateSubscriptionUseCaseRequest): Promise<CreateSubscriptionUseCaseResponse> {
    const subscription = await this.subscriptionsRepository.create({ status, user_id });
    return subscription;
  }
}
