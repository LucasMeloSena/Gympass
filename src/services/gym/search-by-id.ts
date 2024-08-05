import { GymsRepository } from '@/repositories/gyms.repository';
import { Gym } from '@prisma/client';

interface SearchGymByIdUseCaseRequest {
  id: string;
}

interface SearchGymByIdUseCaseResponse {
  gym: Gym | null;
}

export class SearchGymByIdUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ id }: SearchGymByIdUseCaseRequest): Promise<SearchGymByIdUseCaseResponse> {
    const gym = await this.gymsRepository.findById(id);

    return {
      gym,
    };
  }
}
