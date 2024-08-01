import { GymsRepository } from '@/repositories/gyms.repository';
import { Gym } from '@prisma/client';

interface CreateGymUseCaseRequest {
  name: string;
  image: string;
  description: string | null;
  phone: string | null;
  email: string;
  latitude: number;
  longitude: number;
  state: string;
  city: string;
  district: string;
  street: string;
  adress_number: string;
  adress_addition: string | null;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ name, image, description, phone, email, latitude, longitude, state, city, district, street, adress_number, adress_addition }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      name,
      image,
      description,
      phone,
      email,
      latitude,
      longitude,
      state,
      city,
      district,
      street,
      adress_number,
      adress_addition,
    });

    return {
      gym,
    };
  }
}
