import { PaymentsRepository } from '@/repositories/payments.repository';
import { PaymentStatus } from '@prisma/client';

export interface CreatePaymentUseCaseRequest {
  user_id: string;
  payment_id: string;
  amount: number;
  status: PaymentStatus;
}

export interface CreatePaymentUseCaseResponse {
  user_id: string;
  payment_id: string;
  amount: number;
  status: PaymentStatus;
}

export class CreatePaymentUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({ payment_id, amount, status, user_id }: CreatePaymentUseCaseRequest): Promise<CreatePaymentUseCaseResponse> {
    const payment = await this.paymentsRepository.create({ payment_id, amount, status, user_id });
    return payment;
  }
}
