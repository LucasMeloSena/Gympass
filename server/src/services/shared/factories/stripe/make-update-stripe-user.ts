import { PrismaUsersRepository } from '../../../../repositories/prisma/prisma.users.repository';
import { StripeSettingsRepository } from '../../../../repositories/stripe/stripe.settings.repository';
import { UpdateCustomerUseCase } from '../../../stripe/update-customer';

export function makeUpdateStripeUser() {
  const stripeRepository = new StripeSettingsRepository();
  const usersRepository = new PrismaUsersRepository();
  const useCase = new UpdateCustomerUseCase(stripeRepository, usersRepository);

  return useCase;
}
