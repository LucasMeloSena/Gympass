import { expect, describe, it, beforeEach } from 'vitest';
import { CreateGymUseCase } from './register';
import { InMemoryGymsRepository } from '../../repositories/in-memory/in-memory-gyms.repository';

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
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: null,
      email: 'academiateste@email.com',
      phone: null,
      latitude: -19.9760093,
      longitude: -43.9734746,
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
