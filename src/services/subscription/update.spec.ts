import { expect, describe, it, beforeEach } from 'vitest';
import { SubscriptionStatus } from '@prisma/client';
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/in-memory.subscriptions.repository';
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user.repository';
import { UpdateSubscriptionUseCase } from './update';

let subscriptionRepository: InMemorySubscriptionsRepository;
let usersRepository: InMemoryUserRepository;
let sut: UpdateSubscriptionUseCase;

describe('Update Subscription Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    subscriptionRepository = new InMemorySubscriptionsRepository();
    sut = new UpdateSubscriptionUseCase(subscriptionRepository);
  });

  it('should be able to update subscription', async () => {
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

    const { subscription } = await sut.execute({
      subscriptionId: 'subscription_id_001',
      status: SubscriptionStatus.UNPAID,
    });

    expect(subscription.status).toEqual(SubscriptionStatus.UNPAID);
  });
});
