import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { DebtorsModule } from './debtors/debtors.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        ssl:
          process.env.NODE_ENV === 'development'
            ? false
            : { rejectUnauthorized: false },
      },
      logging: false,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    EventEmitterModule.forRoot(),

    AuthModule,
    UsersModule,
    DebtorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
