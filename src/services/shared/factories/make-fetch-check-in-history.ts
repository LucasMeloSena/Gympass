import { PrismaCheckInRepository } from '@/repositories/prisma/prisma.check-ins.repository';
import { FetchUserCheckInsUseCase } from '@/services/check-in/fetch-user-history';

export function makeFetchCheckInUserHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();
  const useCase = new FetchUserCheckInsUseCase(checkInsRepository);

  return useCase;
}
