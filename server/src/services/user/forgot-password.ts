import { InvalidCredentialsError } from '../shared/errors/invalid-credentials.error';
import { UserRepository } from '../../repositories/users.repository';
import { generateRandomNumbers } from '../../utils/scripts/generate-random-number';
import { EmailRepository } from '../../repositories/email.repository';
import { buildEmail } from '../../utils/email';
import path from 'node:path';

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

    const emailTemplatePath = path.join(process.cwd(), 'static', '/templates/email-template.ejs');
    console.log(emailTemplatePath);
    const content = await buildEmail(emailTemplatePath, code, email, 'Gymsign - Recuperação de senha');
    if (!content) throw new Error();

    this.emailRepository.send(content);

    return {
      code,
    };
  }
}
