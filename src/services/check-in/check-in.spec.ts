import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins.repository';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepository: InMemoryCheckInRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym1',
      name: 'JavaScript Gym',
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      email: 'javascriptgym@example.com',
      latitude: new Decimal(-19.9760093),
      longitude: new Decimal(-43.9712307),
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'usr1',
      gymId: 'gym1',
      userLatitude: -19.9760093,
      userLongitude: -43.9712307,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      userId: 'usr1',
      gymId: 'gym1',
      userLatitude: -19.9760093,
      userLongitude: -43.9712307,
    });

    await expect(() =>
      sut.execute({
        userId: 'usr1',
        gymId: 'gym1',
        userLatitude: -19.9760093,
        userLongitude: -43.9712307,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      userId: 'usr1',
      gymId: 'gym1',
      userLatitude: -19.9760093,
      userLongitude: -43.9712307,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));
    const { checkIn } = await sut.execute({
      userId: 'usr1',
      gymId: 'gym1',
      userLatitude: -19.9760093,
      userLongitude: -43.9712307,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check-in on a distant gym', async () => {
    await gymsRepository.create({
      id: 'gym2',
      name: 'JavaScript Gym',
      image: 'https://gujsp.com.br/wp-content/uploads/2017/09/smart-fit-academia-unidade-shopping-castanheira-belem-pa-1-recepcao.jpg',
      description: 'Some description',
      phone: '(32) 9 0129-1292',
      email: 'javascriptgym@example.com',
      latitude: new Decimal(-19.9760093),
      longitude: new Decimal(-43.9734746),
      state: 'Minas Gerais',
      city: 'Belo Horizonte',
      district: 'Buritis',
      street: 'Maria Heilbuth Surette',
      adress_number: '643',
      adress_addition: 'loja 2',
    });

    await expect(() =>
      sut.execute({
        userId: 'usr1',
        gymId: 'gym2',
        userLatitude: -19.9763473,
        userLongitude: -43.9712307,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
