import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-user.repository';
import { NodemailerRepository } from '../../repositories/nodemailer/nodemailer';
import { ForgotPasswordUseCase } from './forgot-password';

let usersRepository: InMemoryUserRepository;
let emailRepository: NodemailerRepository;
let sut: ForgotPasswordUseCase;

describe('Forgot Password Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    emailRepository = new NodemailerRepository();
    sut = new ForgotPasswordUseCase(usersRepository, emailRepository);
  });

  it('should be able to get a 2FA code', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      phone: '(32) 9 0129-1292',
    });

    const { code } = await sut.execute({ email: user.email });

    expect(code).toEqual(expect.any(String));
  });
});
