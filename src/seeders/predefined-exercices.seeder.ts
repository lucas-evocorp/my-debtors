import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Muscle } from 'src/training-program/entities/muscles.entity';
import { Repository } from 'typeorm';
import { predefinedMuscles } from './predefineds-entities/predefined-muscles';

@Injectable()
export class InsertMusclesSeeder implements Seeder {
  constructor(
    @InjectRepository(Muscle) private muscleRepository: Repository<Muscle>,
  ) {}
  async seed(): Promise<any> {
    const muscleCount = await this.muscleRepository
      .createQueryBuilder('muscles')
      .getCount();

    try {
      if (muscleCount === 0) {
        return this.muscleRepository
          .createQueryBuilder('muscles')
          .insert()
          .into(Muscle)
          .values(predefinedMuscles)
          .execute();
      } else {
        //
      }
    } catch (error) {
      throw new Error('seeder error');
    }
  }

  async drop(): Promise<any> {
    //
  }
}
