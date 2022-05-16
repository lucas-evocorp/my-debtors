import { Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { Training } from '../entities/trainings.entity';
import { TrainingiesRepository } from '../repositories/trainingies-repository';

@Injectable()
export class CreateTrainingUseCase {
  constructor(private trainingiesRepository: TrainingiesRepository) {}
  async createNewTraining(
    createTrainingDto: CreateTrainingDto,
    userAuth: IUserAuth,
  ): Promise<Training> {
    return await this.trainingiesRepository.createTrainingProgram(
      createTrainingDto,
      userAuth,
    );
  }

  async execute(
    createTrainingDto: CreateTrainingDto,
    userAuth: IUserAuth,
  ): Promise<Training> {
    const createTraining = await this.createNewTraining(
      createTrainingDto,
      userAuth,
    );

    return createTraining;
  }
}
