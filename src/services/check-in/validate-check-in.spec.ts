import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-checkins.repository';
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { ValidateCheckInUseCase } from './validate-check-in';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';
import { LateCheckInValidateError } from '../shared/errors/late-check-in-validate.error';

let checkInsRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInUseCase;

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate the check-in ', async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_id: 'usr1',
      gym_id: 'gym1',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate an existent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-checkin-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate check-in after 20 minutes of its creation.', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const createdCheckIn = await checkInsRepository.create({
      user_id: 'usr1',
      gym_id: 'gym1',
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;
    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidateError);
  });
});
