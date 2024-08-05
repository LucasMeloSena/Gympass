import { expect, describe, it, beforeEach } from 'vitest';
import { CreateUserUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user.repository';
import { UserAlreadyExistsError } from '../shared/errors/user-already-exists.error';

let usersRepository: InMemoryUserRepository;
let sut: CreateUserUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(31) 9 0000-0000',
    });

    expect(user).toHaveProperty('id');
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      phone: '(31) 9 0000-0000',
    });

    const isPasswordCorrectlyHash = await compare('123456', user.password_hash);
    expect(isPasswordCorrectlyHash).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      phone: '(31) 9 0000-0000',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        phone: '(31) 9 0000-0001',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
