import { describe, it, beforeEach, expect } from 'vitest';
import { SubscriptionStatus } from '@prisma/client';
import { hash } from 'bcryptjs';
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/in-memory.subscriptions.repository';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user.repository';
import { VerifySubscriptionStatusUseCase } from './verify-status';

let subscriptionRepository: InMemorySubscriptionsRepository;
let usersRepository: InMemoryUserRepository;
let sut: VerifySubscriptionStatusUseCase;

describe('Verify Subscription Status Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    subscriptionRepository = new InMemorySubscriptionsRepository();
    sut = new VerifySubscriptionStatusUseCase(subscriptionRepository);
  });

  it('should be able to verify the subscription status', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(31) 9 0000-0000',
    });

    await subscriptionRepository.create({
      status: SubscriptionStatus.ACTIVE,
      user_id: user.id,
      subscription_id: 'subscription_id_001',
    });

    const { subscription, isValid } = await sut.execute({ userId: user.id });

    expect(isValid).toBe(true);
    expect(subscription).toHaveProperty('id');
  });
});
