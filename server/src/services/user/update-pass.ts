import { hash } from 'bcryptjs';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '../shared/errors/resource-not-found.error';
import { UserRepository } from '../../repositories/users.repository';

export interface UpdatePasswordUseCaseRequest {
  email: string;
  password: string;
}

interface UpdatePasswordUseCaseResponse {
  user: User;
}

export class UpdatePasswordUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ email, password }: UpdatePasswordUseCaseRequest): Promise<UpdatePasswordUseCaseResponse> {
    const userInfo = await this.usersRepository.findByEmail(email);
    if (!userInfo) throw new ResourceNotFoundError();

    if (password) {
      password = await hash(password, 6);
    }

    const updatedUser = await this.usersRepository.updatePass(email, password);
    return { user: updatedUser };
  }
}
