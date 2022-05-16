import { NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { Training } from '../entities/trainings.entity';

@EntityRepository(Training)
export class TrainingiesRepository extends Repository<Training> {
  async createTrainingProgram(
    createTrainingDto: CreateTrainingDto,
    userAuth: IUserAuth,
  ) {
    const newTraining = this.create({
      name: createTrainingDto.name,
      userId: userAuth.userId,
      createdAt: new Date(),
    });

    return await this.save(newTraining);
  }

  async updateTrainingProgam(id: number, updateTrainingDto: UpdateTrainingDto) {
    return await this.update(id, updateTrainingDto);
  }

  async getTrainingProgram(id: number) {
    const trainingProgram = await this.findOne(id);

    if (!trainingProgram) {
      throw new NotFoundException('Programa de treino, não encontrado');
    }
    return trainingProgram;
  }
}
