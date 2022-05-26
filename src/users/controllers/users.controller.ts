import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/core/decorators/user-auth';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DeleteUserDto } from '../dtos/delete-user.dto';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { CreateMeUserAccountUseCase } from '../use-cases/create-me-user-account.usecase';
import { DeleteMeUserAccountUseCase } from '../use-cases/delete-me-user-account.usecase';
import { listUsersUseCase } from '../use-cases/list-users.usecase';
import { UpdatePasswordUseCase } from '../use-cases/update-me-user-account-password.usecase';

@Controller('users')
@ApiBearerAuth()
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly createMeUserAccountUseCase: CreateMeUserAccountUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
    private readonly listUsersUseCase: listUsersUseCase,
    private readonly deleteMeUserAccountUseCase: DeleteMeUserAccountUseCase,
  ) {}
  @Post()
  async CreateUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IResponseApiData> {
    const user = await this.createMeUserAccountUseCase.execute(createUserDto);

    return responseApiData({ user }, 'Usuario criado com sucesso');
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update-password')
  async updatePassword(
    @UserAuth() userAuth: IUserAuth,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<IResponseApiData> {
    const updatePassword = await this.updatePasswordUseCase.execute(
      userAuth,
      updatePasswordDto,
    );

    return responseApiData(
      updatePassword.affected,
      'sua senha foi alterada com sucesso',
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async listUsers(@UserAuth() userAuth: IUserAuth): Promise<IResponseApiData> {
    const users = await this.listUsersUseCase.execute(userAuth);

    return responseApiData(users, 'lista de usuarios');
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteMeUserAccount(
    @UserAuth() userAuth: IUserAuth,
    @Body() deleteUserDto: DeleteUserDto,
  ) {
    const deleteUser = await this.deleteMeUserAccountUseCase.execute(
      userAuth,
      deleteUserDto,
    );

    return responseApiData(deleteUser, 'sua conta foi deletada com sucesso!');
  }
}
