import { PrismaUsersRepository } from '../../../../repositories/prisma/prisma.users.repository';
import { UpdatePasswordUseCase } from '../../../user/update-pass';

export function makeUpdatePasswordUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new UpdatePasswordUseCase(usersRepository);

  return useCase;
}
