import { StripeRepository } from '@/repositories/stripe.repository';
import { CheckOutSessionError } from '../shared/errors/check-out-session.error';

interface CreatePaymentSessionUseCaseRequest {
  currency?: string;
  product?: {
    name: string;
    price: number;
    images: string[];
    description: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
  };
  quantity: number;
  success_url: string;
  cancel_url: string;
}

interface CreatePaymentSessionUseCaseResponse {
  url: string;
}

export class CreatePaymentSessionUseCase {
  constructor(private stripeRepository: StripeRepository) {}

  async execute({ currency, product, quantity, success_url, cancel_url, user }: CreatePaymentSessionUseCaseRequest): Promise<CreatePaymentSessionUseCaseResponse> {
    const session_url = await this.stripeRepository.createCheckOutSession({ currency, product, quantity, success_url, cancel_url, user });

    if (!session_url) {
      throw new CheckOutSessionError();
    }

    return {
      url: session_url,
    };
  }
}
