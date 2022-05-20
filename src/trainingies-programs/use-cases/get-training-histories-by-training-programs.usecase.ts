import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingHistoriesRepository } from 'src/training-histories/repositories/training-histories.repository';

@Injectable()
export class GetTrainingHistoriesByTrainingProgramUseCase {
  constructor(
    private readonly trainingHistoriesRepository: TrainingHistoriesRepository,
  ) {}

  async execute(trainingProgramId: number) {
    const trainingHistories =
      await this.trainingHistoriesRepository.listTrainingHistoriesByTrainingProgram(
        trainingProgramId,
      );

    if (!trainingHistories) {
      throw new NotFoundException('Você não possui historicos de treinamento!');
    }

    return trainingHistories;
  }
}
