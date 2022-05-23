import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Muscle } from 'src/training-histories/entities/muscles.entity';
import { MusclesRepository } from 'src/training-histories/repositories/muscles.repository';
import { Repository } from 'typeorm';
import { predefinedMuscles } from './predefineds-entities/predefined-muscles';

@Injectable()
export class InsertMusclesSeeder implements Seeder {
  constructor(private musclesRepository: MusclesRepository) {}
  async seed(): Promise<any> {
    const muscleCount = await this.musclesRepository
      .createQueryBuilder('muscles')
      .getCount();

    try {
      if (muscleCount === 0) {
        return this.musclesRepository
          .createQueryBuilder('muscles')
          .insert()
          .into(Muscle)
          .values(predefinedMuscles)
          .execute();
      }
    } catch (error) {
      throw new Error('predefinedExercice seeder error');
    }
  }

  async drop(): Promise<any> {
    //
  }
}
