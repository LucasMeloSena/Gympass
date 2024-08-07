import { CheckInsRepository } from '@/repositories/check-ins.repository';

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
  checkInsCountByMonth: {
    month: string;
    count: number;
  }[];
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);
    const months = [
      { month: 'January', number: 1 },
      { month: 'February', number: 2 },
      { month: 'March', number: 3 },
      { month: 'April', number: 4 },
      { month: 'May', number: 5 },
      { month: 'June', number: 6 },
      { month: 'July', number: 7 },
      { month: 'August', number: 8 },
      { month: 'September', number: 9 },
      { month: 'October', number: 10 },
      { month: 'November', number: 11 },
      { month: 'December', number: 12 },
    ];

    const checkInsCountByMonth = await Promise.all(
      months.map(async ({ month, number }) => ({
        month,
        count: await this.checkInsRepository.findByMonthAndUser(userId, number),
      })),
    );

    return {
      checkInsCount,
      checkInsCountByMonth,
    };
  }
}
