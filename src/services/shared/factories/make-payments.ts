import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma.payments.repository';
import { CreatePaymentUseCase } from '@/services/payment/create';

export function makeCreatePayments() {
  const paymentsRepository = new PrismaPaymentsRepository();
  const useCase = new CreatePaymentUseCase(paymentsRepository);

  return useCase;
}
