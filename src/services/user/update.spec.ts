import { expect, describe, it, beforeEach } from 'vitest';
import { compare, hash } from 'bcryptjs';
import { UpdateUserUseCase } from './update';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user.repository';

let usersRepository: InMemoryUserRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it('should be able to update', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(31) 9 0000-0000',
    });

    const { user } = await sut.execute({
      user: {
        id: createdUser.id,
        name: 'John Doe II',
        email: 'johndoe2@example.com',
        password_hash: '12345678',
        phone: '(31) 9 0000-0001',
      },
    });
    expect(user.name).toBe('John Doe II');
  });

  it('should hash user password upon update', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      phone: '(31) 9 0000-0000',
    });

    const { user } = await sut.execute({
      user: {
        id: createdUser.id,
        name: 'John Doe II',
        email: 'johndoe2@example.com',
        password_hash: '12345678',
        phone: '(31) 9 0000-0001',
      },
    });

    const isPasswordCorrectlyHash = await compare('123456', user.password_hash);
    expect(isPasswordCorrectlyHash).toBe(true);
  });
});
