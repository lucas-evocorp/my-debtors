import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TrainingHistoriesModule } from './training-histories/training-history.module';
import { TrainingiesFoldersModule } from './trainingies-folders/training-folders.module';
import { TrainingiesProgramsModule } from './trainingies-programs/trainings.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
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

    TrainingHistoriesModule,
    AuthModule,
    UsersModule,
    TrainingiesFoldersModule,
    TrainingiesProgramsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
