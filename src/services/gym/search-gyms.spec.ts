import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'JavaScript Gym',
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      email: 'javascriptgym@example.com',
      latitude: -19.9760093,
      longitude: -43.9712307,
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    await gymsRepository.create({
      name: 'TypeScript Gym',
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      email: 'typescriptgym@example.com',
      latitude: -19.9760093,
      longitude: -43.9712307,
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms[0]).toEqual(expect.objectContaining({ name: 'JavaScript Gym' }));
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `JavaScript Gym ${i}`,
        image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
        description: 'Some description',
        phone: '(32) 9 0129-1292',
        email: 'javascriptgym@example.com',
        latitude: -19.9760093,
        longitude: -43.9712307,
        state: 'Minas Gerais',
        city: 'Belo Horizonte',
        district: 'Buritis',
        street: 'Maria Heilbuth Surette',
        adress_number: '643',
        adress_addition: 'loja 2',
      });
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([expect.objectContaining({ name: 'JavaScript Gym 21' }), expect.objectContaining({ name: 'JavaScript Gym 22' })]);
  });
});
