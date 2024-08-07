import { Prisma, Role, User } from '@prisma/client';
import { UserRepository } from '../users.repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUserRepository implements UserRepository {
  private items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      role: data.role ?? Role.MEMBER,
      created_at: new Date(),
    };
    this.items.push(user);
    return user;
  }

  async update(user: User) {
    const userIndex = this.items.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.items[userIndex] = user;
    }

    return this.items[userIndex];
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    if (!user) return null;
    return user;
  }

  async findByPhone(phone: string) {
    const user = this.items.find((item) => item.phone === phone);
    if (!user) return null;
    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);
    if (!user) return null;
    return user;
  }
}
