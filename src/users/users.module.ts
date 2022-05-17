import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersRepository } from './repositories/users-repository';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
