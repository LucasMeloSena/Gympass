import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins.repository';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';
import dayjs from 'dayjs';
import { LateCheckInValidateError } from '../shared/errors/late-check-in-validate.error';

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) throw new ResourceNotFoundError();

    checkIn.validated_at = new Date();

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes');

    if (distanceInMinutesFromCheckInCreation > 20) throw new LateCheckInValidateError();

    await this.checkInsRepository.save(checkIn);

    return {
      checkIn,
    };
  }
}
