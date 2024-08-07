import { UserRepository } from '@/repositories/users.repository';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';
import { User } from '@prisma/client';

interface UpdateUserUseCaseRequest {
  id: string;
  name: string;
  email: string;
  password: string | null;
  phone: string;
}

interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ id, name, email, password, phone }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new ResourceNotFoundError();

    if (!password) {
      user.name = name;
      user.email = email;
      user.phone = phone;
    } else {
      const password_hash = await hash(password, 6);
      user.name = name;
      user.email = email;
      user.password_hash = password_hash;
      user.phone = phone;
    }

    const updatedUser = await this.usersRepository.update(user);
    return { user: updatedUser };
  }
}
