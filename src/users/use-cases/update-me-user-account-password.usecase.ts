import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userAuth: IUserAuth, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersRepository.getUser(userAuth);

    console.log(updatePasswordDto);

    if (
      (await bcrypt.compare(updatePasswordDto.oldPassword, user.password)) ===
      false
    ) {
      throw new BadRequestException(
        'A senha informada não corresponde a sua antiga senha!',
      );
    }

    if (await bcrypt.compare(updatePasswordDto.newPassword, user.password)) {
      throw new BadRequestException(
        'A nova senha não pode ser igual a anterior!',
      );
    }

    return await this.usersRepository.updatePassword(
      userAuth,
      updatePasswordDto,
    );
  }
}
