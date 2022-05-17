import { Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { Training } from '../entities/trainings.entity';
import { TrainingiesRepository } from '../repositories/trainingies-repository';

@Injectable()
export class CreateTrainingProgramUseCase {
  constructor(private readonly trainingiesRepository: TrainingiesRepository) {}

  async execute(
    createTrainingDto: CreateTrainingDto,
    userAuth: IUserAuth,
  ): Promise<Training> {
    const createTraining =
      await this.trainingiesRepository.createTrainingProgram(
        createTrainingDto,
        userAuth,
      );

    return createTraining;
  }
}
