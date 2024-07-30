import { PrismaGymsRepository } from '@/repositories/prisma/prisma.gyms.repository';
import { FetchNearByGymsUseCase } from '@/services/gym/fetch-nearby-gyms';

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearByGymsUseCase(gymsRepository);

  return useCase;
}
