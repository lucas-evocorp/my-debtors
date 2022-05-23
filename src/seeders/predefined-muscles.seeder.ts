import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { PredefinedExercice } from 'src/training-histories/entities/predefined-exercices.entity';
import { PredefinedsExercicesRepository } from 'src/training-histories/repositories/predefineds-exercices.repository';
import { createQueryBuilder, Repository } from 'typeorm';
import { predefinedsExercices } from './predefineds-entities/predefined-exercices.seeder';
import { predefinedMuscles } from './predefineds-entities/predefined-muscles';

@Injectable()
export class InsertPredefinedsExercicesSeeder implements Seeder {
  constructor(
    private predefinedExercicesRepository: PredefinedsExercicesRepository,
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
      throw new Error('musclesSeeder Error');
    }
  }

  async drop(): Promise<any> {
    //
  }
}
