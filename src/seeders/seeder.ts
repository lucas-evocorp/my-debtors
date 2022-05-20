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
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: 'postgres',
      password: 'postgres',
      database: process.env.PG_DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Muscle, PredefinedExercice]),
  ],
}).run([InsertMusclesSeeder, InsertPredefinedsExercicesSeeder]);
