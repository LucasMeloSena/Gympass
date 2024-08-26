import { hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';
import { UserRepository } from '../../repositories/users.repository';

export interface UpdateUserUseCaseRequest {
  user: {
    id: string;
    name?: string;
    email?: string;
    password_hash?: string;
    phone?: string;
  };
}

interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ user }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userInfo = await this.usersRepository.findById(user.id);
    if (!userInfo) throw new ResourceNotFoundError();

    if (user.password_hash) {
      user.password_hash = await hash(user.password_hash, 6);
    }

    const newUserData = {
      ...userInfo,
      ...user,
      id: user.id,
    };

    const updatedUser = await this.usersRepository.update(newUserData);
    return { user: updatedUser };
  }
}
