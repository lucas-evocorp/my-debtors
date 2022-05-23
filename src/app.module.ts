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
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        ssl: process.env.NODE_ENV === 'development' ? false : true,
      },
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
