import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { Muscle } from 'src/training-program/entities/muscles.entity';
import { PredefinedExercice } from 'src/training-program/entities/predefined-exercices.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { predefinedsExercices } from './predefineds-entities/predefined-exercices.seeder';
import { predefinedMuscles } from './predefineds-entities/predefined-muscles';

@Injectable()
export class InsertPredefinedsExercicesSeeder implements Seeder {
  constructor(
    @InjectRepository(PredefinedExercice)
    private predefinedExercicesRepository: Repository<PredefinedExercice>,
  ) {}
  async seed(): Promise<any> {
    const predefinedExercicesCount = await this.predefinedExercicesRepository
      .createQueryBuilder('predefined_exercices')
      .getCount();

    try {
      if (predefinedExercicesCount === 0) {
        return this.predefinedExercicesRepository
          .createQueryBuilder('predefined_exercices')
          .insert()
          .into(PredefinedExercice)
          .values(predefinedsExercices)
          .execute();
      }
    } catch (error) {
      throw new Error('seeder Error');
    }
  }

  async drop(): Promise<any> {
    //
  }
}
