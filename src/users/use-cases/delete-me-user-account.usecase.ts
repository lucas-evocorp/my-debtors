import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { DeleteUserDto } from '../dtos/delete-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DeleteMeUserAccountUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userAuth: IUserAuth, deleteUserDto: DeleteUserDto) {
    const user = await this.usersRepository.getUser(userAuth);

    if (
      (await bcrypt.compare(deleteUserDto.confirmPassword, user.password)) ===
      false
    ) {
      throw new BadRequestException('Senha incorreta!');
    }
    return await this.usersRepository.deleteUser(userAuth);
  }
}
