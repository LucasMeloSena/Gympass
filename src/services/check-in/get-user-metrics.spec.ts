import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins.repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { GetUserMetricsUseCase } from './get-user-metrics';

let checkInsRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsUseCase;

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: 'user1',
      gym_id: 'gym1',
    });

    const checkIn = await checkInsRepository.create({
      user_id: 'user1',
      gym_id: 'gym2',
    });

    await checkInsRepository.save({
      ...checkIn,
      validated_at: new Date(),
    });

    const { checkInsCount, checkInsCountByMonth } = await sut.execute({
      userId: 'user1',
    });

    const currentMonth = new Date().getMonth();

    expect(checkInsCount).toEqual(2);
    expect(checkInsCountByMonth[currentMonth].count).toEqual(1);
  });
});
