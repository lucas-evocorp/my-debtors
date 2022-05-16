import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/users.entity';
import { UsersRepository } from '../repositories/users-repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.getUserByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException('Esse email já esta sendo usado!');
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('As senhas Não Correspondem');
    }

    return await this.usersRepository.createUser(createUserDto);
  }
}
