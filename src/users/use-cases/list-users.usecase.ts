import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class listUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userAuth: IUserAuth): Promise<User[]> {
    const user = await this.usersRepository.getUser(userAuth);

    if (user.admin === false) {
      throw new UnauthorizedException(
        'Você não esta autorizado a acessar essa informação!',
      );
    }

    return this.usersRepository.findUsers();
  }
}
