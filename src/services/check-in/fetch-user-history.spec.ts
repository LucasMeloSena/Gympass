import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins.repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { FetchUserCheckInsUseCase } from './fetch-user-history';

let checkInsRepository: InMemoryCheckInRepository;
let sut: FetchUserCheckInsUseCase;

describe('Fetch Check-ins Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new FetchUserCheckInsUseCase(checkInsRepository);
  });

  it('should be able to fetch check-ins history', async () => {
    await checkInsRepository.create({
      user_id: 'user1',
      gym_id: 'gym1',
    });

    await checkInsRepository.create({
      user_id: 'user1',
      gym_id: 'gym2',
    });

    const { checkIns } = await sut.execute({
      userId: 'user1',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([expect.objectContaining({ gym_id: 'gym1' }), expect.objectContaining({ gym_id: 'gym2' })]);
  });

  it('should be able to fetch check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'user1',
        gym_id: `gym${i}`,
      });
    }

    const { checkIns } = await sut.execute({
      userId: 'user1',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([expect.objectContaining({ gym_id: 'gym21' }), expect.objectContaining({ gym_id: 'gym22' })]);
  });
});
