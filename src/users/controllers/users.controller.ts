import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.usecase';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}
  @Post()
  async CreateUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IResponseApiData> {
    const user = await this.createUserUseCase.execute(createUserDto);
    return responseApiData(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      'Usuario criado com sucesso',
    );
  }
}
