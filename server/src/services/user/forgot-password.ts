import { InvalidCredentialsError } from '../shared/errors/invalid-credentials.error';
import { UserRepository } from '../../repositories/users.repository';
import { generateRandomNumbers } from '../../utils/scripts/generate-random-number';
import { EmailRepository } from '../../repositories/email.repository';
import { buildEmail } from '../../utils/email';
import path from 'node:path';
import { exec } from 'node:child_process';

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

    const command = 'ls';
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Erro no stderr: ${stderr}`);
        return;
      }

      console.log(`Saída do comando: ${stdout}`);
    });

    const emailTemplatePath = path.resolve(process.cwd(), 'public/templates/email-template.ejs');
    const content = await buildEmail(emailTemplatePath, code, email, 'Gymsign - Recuperação de senha');
    console.log(content);
    if (!content) throw new Error();

    this.emailRepository.send(content);

    return {
      code,
    };
  }
}
