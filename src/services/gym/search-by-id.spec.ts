import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { SearchGymByIdUseCase } from './search-by-id';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymByIdUseCase;

describe('Search Gym By Id Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymByIdUseCase(gymsRepository);
  });

  it('should be able to search gym by id', async () => {
    await gymsRepository.create({
      id: 'gym1',
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

    const { gym } = await sut.execute({
      id: 'gym1',
    });
    expect(gym).toEqual(expect.objectContaining({ name: 'JavaScript Gym' }));
  });
});
