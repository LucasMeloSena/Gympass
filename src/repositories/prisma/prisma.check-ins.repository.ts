import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins.repository';
import { prisma } from '@/utils/database';
import dayjs from 'dayjs';

export class PrismaCheckInRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async save(data: CheckIn) {
    const checkIn = prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          lte: endOfTheDay.toDate(),
          gte: startOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
        validated_at: {
          not: null,
        },
      },
    });

    return count;
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async findByMonthAndUser(userId: string, month: number) {
    const year = new Date().getFullYear();
    const startOfMonth = dayjs()
      .year(year)
      .month(month - 1)
      .startOf('month')
      .toDate();
    const endOfMonth = dayjs()
      .year(year)
      .month(month - 1)
      .endOf('month')
      .toDate();

    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
        validated_at: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    return checkIns.length;
  }
}
