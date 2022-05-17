import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { Training } from '../entities/trainings.entity';
import { TrainingiesRepository } from '../repositories/trainingies-repository';

@Injectable()
export class listUserTrainingiesProgramsUseCase {
  constructor(private readonly trainingiesRepository: TrainingiesRepository) {}

  async execute(userAuth: IUserAuth): Promise<Training[]> {
    const getUserTrainingiesPrograms =
      await this.trainingiesRepository.getUserTrainingiesPrograms(userAuth);

    if (!getUserTrainingiesPrograms) {
      throw new NotFoundException('Você não possui nenhum programa de treino!');
    }

    return getUserTrainingiesPrograms;
  }
}
