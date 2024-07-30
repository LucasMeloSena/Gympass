import { UserRepository } from '@/repositories/users.repository';
import { hash } from 'bcryptjs';
import { Role, User } from '@prisma/client';
import { UserAlreadyExistsError } from '../shared/errors/user-already-exists.error';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ name, email, password, role }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      role,
    });

    return {
      user,
    };
  }
}
