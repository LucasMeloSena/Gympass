import { StripeSettingsRepository } from '../../../../repositories/stripe/stripe.settings.repository';
import { CreatePaymentSessionUseCase } from '../../../stripe/create';

export function makeStripeCheckout() {
  const StripeRepository = new StripeSettingsRepository();
  const useCase = new CreatePaymentSessionUseCase(StripeRepository);

  return useCase;
}
