import { Payment, Prisma } from '@prisma/client';
import { PaymentsRepository } from '../payments.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryPaymentsRepository implements PaymentsRepository {
  private items: Payment[] = [];

  async create(data: Prisma.PaymentUncheckedCreateInput) {
    const payment = {
      id: data.id ?? randomUUID(),
      payment_id: data.payment_id,
      amount: data.amount,
      status: data.status,
      created_at: new Date(),
      user_id: data.user_id,
      subscription_id: data.subscription_id ?? null,
    };
    this.items.push(payment);
    return payment;
  }
}
