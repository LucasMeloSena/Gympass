import { InvalidCredentialsError } from '../shared/errors/invalid-credentials.error';
import { UserRepository } from '../../repositories/users.repository';
import { generateRandomNumbers } from '../../utils/scripts/generate-random-number';
import { EmailRepository } from '../../repositories/email.repository';
import { buildEmail } from '../../utils/email';

interface ForgotPasswordUseCaseRequest {
  email: string;
}

interface ForgotPasswordUseCaseResponse {
  code: string;
}

export class ForgotPasswordUseCase {
  constructor(
    private usersRepository: UserRepository,
    private emailRepository: EmailRepository,
  ) {}

  async execute({ email }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const code = generateRandomNumbers();

    const content = await buildEmail(code, email, 'Gymsign - Recuperação de senha');
    if (!content) throw new Error();

    await this.emailRepository.send(content);

    return {
      code,
    };
  }
}
