import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder, DataFactory } from 'nestjs-seeder';
import { PredefinedExercice } from 'src/training-histories/entities/predefined-exercices.entity';
import { User } from 'src/users/entities/users.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { createQueryBuilder, Repository } from 'typeorm';
import { predefinedsExercices } from './predefineds-entities/predefined-exercices.seeder';
import { predefinedMuscles } from './predefineds-entities/predefined-muscles';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class insertUserAdminSeeder implements Seeder {
  constructor(private usersRepository: UsersRepository) {}
  async seed(): Promise<any> {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      parseInt(process.env.SALT_OR_ROUNDS),
    );
    try {
      const userAdmin = await this.usersRepository.getUserByEmail(
        process.env.ADMIN_EMAIL,
      );

      if (userAdmin && userAdmin.admin === true) {
        console.error('admininstrador ja existe na aplicação');
      } else {
        return await this.usersRepository
          .createQueryBuilder('users')
          .insert()
          .into(User)
          .values({
            admin: true,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            name: 'admininstrator',
          })
          .execute();
      }
    } catch (error) {
      console.error('user seeder error');
    }
  }

  async drop(): Promise<any> {
    //
  }
}
