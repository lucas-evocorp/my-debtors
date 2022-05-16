import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { AuthUseCase } from './use-cases/auth.usecase';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/repositories/users-repository';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthUseCase, JwtStrategy],
})
export class AuthModule {}
