import { TypeOrmModule } from '@nestjs/typeorm';
import { Console } from 'console';
import { seeder } from 'nestjs-seeder';
import { Muscle } from 'src/training-histories/entities/muscles.entity';
import { PredefinedExercice } from 'src/training-histories/entities/predefined-exercices.entity';
import { MusclesRepository } from 'src/training-histories/repositories/muscles.repository';
import { PredefinedsExercicesRepository } from 'src/training-histories/repositories/predefineds-exercices.repository';
import { TrainingHistoriesModule } from 'src/training-histories/training-history.module';
import { UsersModule } from 'src/users/users.module';
import { insertUserAdminSeeder } from './create-user-admin.seeder';
import { InsertMusclesSeeder } from './predefined-exercices.seeder';
import { InsertPredefinedsExercicesSeeder } from './predefined-muscles.seeder';
import * as dotenv from 'dotenv';
dotenv.config();
seeder({
  imports: [
    UsersModule,
    TrainingHistoriesModule,
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
      logging: true,
    }),
  ],
}).run([
  InsertMusclesSeeder,
  InsertPredefinedsExercicesSeeder,
  insertUserAdminSeeder,
]);
