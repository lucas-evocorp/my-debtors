import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingHistoriesRepository } from '../repositories/training-histories.repository';

@Injectable()
export class ListAllTrainingHistoryDataUseCase {
  constructor(
    private readonly trainingHistoriesRepository: TrainingHistoriesRepository,
  ) {}

  async execute(trainingHistoryId: string) {
    const allTrainingHistoryData =
      await this.trainingHistoriesRepository.listAllTrainingHistoriesData(
        trainingHistoryId,
      );

    if (!allTrainingHistoryData) {
      throw new NotFoundException('você nao possui historicos');
    }

    return allTrainingHistoryData;
  }
}
