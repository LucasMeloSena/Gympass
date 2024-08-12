import Stripe from 'stripe';
import { env } from '../../env';
import { StripeRepository } from '../../repositories/stripe.repository';
import { UserRepository } from '../../repositories/users.repository';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';

interface UpdateCustomerUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
}

export class UpdateCustomerUseCase {
  constructor(
    private stripeRepository: StripeRepository,
    private usersRepository: UserRepository,
  ) {}

  async execute({ id, name, email }: UpdateCustomerUseCaseRequest) {
    const stripe = new Stripe(env.STRIPE_KEY);
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (!name && !email) return;

    const customer = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    const data: Partial<{ email: string; name: string }> = {};
    if (email) data.email = email;
    if (name) data.name = name;

    await this.stripeRepository.updateCostumer(customer.data[0].id, data);
  }
}
