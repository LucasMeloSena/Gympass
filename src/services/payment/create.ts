import { PaymentStatus } from '@prisma/client';
import { PaymentsRepository } from '../../repositories/payments.repository';

export interface CreatePaymentUseCaseRequest {
  user_id: string;
  payment_id: string;
  amount: number;
  status: PaymentStatus;
  subscription_id: string | null;
}

export interface CreatePaymentUseCaseResponse {
  user_id: string;
  payment_id: string;
  amount: number;
  status: PaymentStatus;
  subscription_id: string | null;
}

export class CreatePaymentUseCase {
  constructor(private paymentsRepository: PaymentsRepository) {}

  async execute({ payment_id, amount, status, user_id, subscription_id }: CreatePaymentUseCaseRequest): Promise<CreatePaymentUseCaseResponse> {
    const payment = await this.paymentsRepository.create({ payment_id, amount, status, user_id, subscription_id });
    return payment;
  }
}
