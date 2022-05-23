import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { PredefinedExercice } from 'src/training-histories/entities/predefined-exercices.entity';
import { User } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { createQueryBuilder, Repository } from 'typeorm';
import { userAdmin } from './predefineds-entities/predefined-admin-user';
import { predefinedsExercices } from './predefineds-entities/predefined-exercices.seeder';
import { predefinedMuscles } from './predefineds-entities/predefined-muscles';

@Injectable()
export class insertUserAdminSeeder implements Seeder {
  constructor(private usersRepository: UsersRepository) {}
  async seed(): Promise<any> {
    try {
      return await this.usersRepository
        .createQueryBuilder('users')
        .insert()
        .into(User)
        .values(userAdmin)
        .execute();
    } catch (error) {
      console.error('user seeder error');
    }
  }

  async drop(): Promise<any> {
    //
  }
}
