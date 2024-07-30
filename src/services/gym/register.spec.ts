import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { CreateGymUseCase } from './register';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      name: 'Academia Teste',
      description: null,
      phone: null,
      latitude: -19.9760093,
      longitude: -43.9734746,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
