import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryPaymentsRepository } from '../../repositories/in-memory/in-memory-payments.repository';
import { CreatePaymentUseCase } from './create';
import { PaymentStatus, SubscriptionStatus } from '@prisma/client';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user.repository';
import { InMemorySubscriptionsRepository } from '../../repositories/in-memory/in-memory.subscriptions.repository';
import { hash } from 'bcryptjs';

let paymentsRepository: InMemoryPaymentsRepository;
let sut: CreatePaymentUseCase;
let usersRepository: InMemoryUserRepository;
let subscriptionRepository: InMemorySubscriptionsRepository;

describe('Payment Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    subscriptionRepository = new InMemorySubscriptionsRepository();
    paymentsRepository = new InMemoryPaymentsRepository();
    sut = new CreatePaymentUseCase(paymentsRepository);
  });

  it('should be able to create a payment', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(31) 9 0000-0000',
    });

    const subscription = await subscriptionRepository.create({
      status: SubscriptionStatus.ACTIVE,
      user_id: user.id,
      subscription_id: 'subscription_id_001',
    });

    const payment = await sut.execute({
      payment_id: 'payment_id_001',
      amount: 30,
      status: PaymentStatus.SUCCESSED,
      user_id: user.id,
      subscription_id: subscription.id,
    });

    expect(payment).toHaveProperty('id');
  });
});
