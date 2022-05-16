import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/repositories/users-repository';

export interface IValidateUserResponse {
  user: {
    id: string;
    name: string;
  };
  access_token: string;
}

@Injectable()
export class AuthUseCase {
  constructor(
    private jwtservice: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<IValidateUserResponse> {
    const user = await this.usersRepository.getUserByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('Email ou senha incorreto(os)');
    }

    if ((await bcrypt.compare(loginDto.password, user.password)) === false) {
      throw new BadRequestException('Email ou senha incorreto(os)');
    }

    const payload = { username: user.name, sub: user.id };

    const token = this.jwtservice.sign(payload);

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      access_token: token,
    };
  }
}
