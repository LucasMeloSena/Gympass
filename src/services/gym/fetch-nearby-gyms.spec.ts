import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearByGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearByGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    const sla = await gymsRepository.create({
      name: 'Near Gym',
      description: null,
      phone: null,
      latitude: -19.9760093,
      longitude: -43.9734746,
    });

    await gymsRepository.create({
      name: 'Far Gym',
      description: null,
      phone: null,
      latitude: -19.8848941,
      longitude: -43.9087459,
    });

    const { gyms } = await sut.execute({
      userLatitude: -19.9760093,
      userLongitude: -43.9734746,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms[0]).toEqual(expect.objectContaining({ name: 'Near Gym' }));
  });
});
