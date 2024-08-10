import { PrismaGymsRepository } from '../../../repositories/prisma/prisma.gyms.repository';
import { SearchGymByIdUseCase } from '../../gym/search-by-id';

export function makeSearchGymByIdUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymByIdUseCase(gymsRepository);

  return useCase;
}
