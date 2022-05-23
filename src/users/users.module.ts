import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './repositories/users.repository';
import { CreateMeUserAccountUseCase } from './use-cases/create-me-user-account.usecase';
import { UsersController } from './controllers/users.controller';
import { UpdatePasswordUseCase } from './use-cases/update-me-user-account-password.usecase';
import { listUsersUseCase } from './use-cases/list-users.usecase';
import { DeleteMeUserAccountUseCase } from './use-cases/delete-me-user-account.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  exports: [TypeOrmModule],
  providers: [
    CreateMeUserAccountUseCase,
    UpdatePasswordUseCase,
    listUsersUseCase,
    DeleteMeUserAccountUseCase,
  ],
})
export class UsersModule {}
