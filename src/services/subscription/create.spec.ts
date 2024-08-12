import { expect, describe, it, beforeEach } from 'vitest';
import { SubscriptionStatus } from '@prisma/client';
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/in-memory.subscriptions.repository';
import { hash } from 'bcryptjs';
import { CreateSubscriptionUseCase } from './create';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user.repository';

let subscriptionRepository: InMemorySubscriptionsRepository;
let usersRepository: InMemoryUserRepository;
let sut: CreateSubscriptionUseCase;

describe('Subscription Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    subscriptionRepository = new InMemorySubscriptionsRepository();
    sut = new CreateSubscriptionUseCase(subscriptionRepository);
  });

  it('should be able to create a payment', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(31) 9 0000-0000',
    });

    const { subscription } = await sut.execute({
      status: SubscriptionStatus.ACTIVE,
      user_id: user.id,
      subscription_id: 'subscription_id_001',
    });

    expect(subscription).toHaveProperty('id');
  });
});
