import { TypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';
import { Muscle } from 'src/training-histories/entities/muscles.entity';
import { PredefinedExercice } from 'src/training-histories/entities/predefined-exercices.entity';
import { InsertMusclesSeeder } from './predefined-exercices.seeder';
import { InsertPredefinedsExercicesSeeder } from './predefined-muscles.seeder';

seeder({
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
      logging: true,
    }),
    TypeOrmModule.forFeature([Muscle, PredefinedExercice]),
  ],
}).run([InsertMusclesSeeder, InsertPredefinedsExercicesSeeder]);
