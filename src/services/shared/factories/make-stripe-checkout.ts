import { CheckOutStripeRepository } from '@/repositories/stripe/stripe.check-out.repository';
import { CreatePaymentSessionUseCase } from '@/services/stripe/create';

export function makeStripeCheckout() {
  const StripeRepository = new CheckOutStripeRepository();
  const useCase = new CreatePaymentSessionUseCase(StripeRepository);

  return useCase;
}
