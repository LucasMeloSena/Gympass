import { PrismaUsersRepository } from '@/repositories/prisma/prisma.users.repository';
import { UpdateUserUseCase } from '@/services/user/update';

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new UpdateUserUseCase(usersRepository);

  return useCase;
}
