import { prisma } from '@/infra/database';
import { UserRepository } from '../users.repository';
import { Prisma } from '@prisma/client';

export class PrismaUsersRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
