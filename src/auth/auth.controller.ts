import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { LoginDto } from './dtos/login.dto';
import { AuthUseCase } from './use-cases/auth.usecase';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}
  @Post()
  async validateUser(@Body() loginDto: LoginDto): Promise<IResponseApiData> {
    const login = await this.authUseCase.validateUser(loginDto);
    return responseApiData(login, 'usuario autenticado com sucesso');
  }
}
