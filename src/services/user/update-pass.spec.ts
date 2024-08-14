import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user.repository';
import { UpdatePasswordUseCase } from './update-pass';

let usersRepository: InMemoryUserRepository;
let sut: UpdatePasswordUseCase;

describe('Update User Password Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new UpdatePasswordUseCase(usersRepository);
  });

  it('should be able to update user password', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(31) 9 0000-0000',
    });

    const oldPass = createdUser.password_hash;

    const { user } = await sut.execute({
      email: createdUser.email,
      password: '12345678',
    });

    expect(oldPass).not.toBe(user.password_hash);
  });
});
