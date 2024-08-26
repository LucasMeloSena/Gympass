import { Prisma } from '@prisma/client';
import { PaymentsRepository } from '../payments.repository';
import { prisma } from '../../utils/database';

export class PrismaPaymentsRepository implements PaymentsRepository {
  async create(data: Prisma.PaymentUncheckedCreateInput) {
    const payment = await prisma.payment.create({
      data,
    });
    return payment;
  }
}
