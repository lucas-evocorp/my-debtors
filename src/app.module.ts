import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TrainingsModule } from './training-program/trainings.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    TrainingsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
