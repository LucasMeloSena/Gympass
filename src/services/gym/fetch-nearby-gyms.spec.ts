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
    await gymsRepository.create({
      name: 'Near Gym',
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      email: 'javascriptgym@example.com',
      latitude: -19.9760093,
      longitude: -43.9734746,
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    await gymsRepository.create({
      name: 'Far Gym',
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      email: 'javascriptgym@example.com',
      latitude: -19.8848941,
      longitude: -43.9087459,
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    const { gyms } = await sut.execute({
      userLatitude: -19.9760093,
      userLongitude: -43.9734746,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms[0]).toEqual(expect.objectContaining({ name: 'Near Gym' }));
  });
});
