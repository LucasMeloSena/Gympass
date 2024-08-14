import { NodemailerRepository } from '../../../../repositories/nodemailer/nodemailer';
import { PrismaUsersRepository } from '../../../../repositories/prisma/prisma.users.repository';
import { ForgotPasswordUseCase } from '../../../user/forgot-password';

export function makeForgotPassword() {
  const usersRepository = new PrismaUsersRepository();
  const emailRepository = new NodemailerRepository();
  const useCase = new ForgotPasswordUseCase(usersRepository, emailRepository);
  return useCase;
}
