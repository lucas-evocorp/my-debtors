import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { TrainingiesFoldersRepository } from 'src/trainingies-folders/repositories/trainingies-folders.repository';
import { TrainingiesProgramsRepository } from 'src/trainingies-programs/repositories/trainingies-programs.repository';
import { CreateTrainingHistoryDto } from '../dtos/create-training-history.dto';
import { TrainingHistoriesRepository } from '../repositories/training-histories.repository';

@Injectable()
export class CreateTrainingHistoryUseCase {
  constructor(
    private readonly trainingHistoriesRepository: TrainingHistoriesRepository,
    private readonly trainingProgramsRepository: TrainingiesProgramsRepository,
    private readonly trainingFolderRepository: TrainingiesFoldersRepository,
  ) {}

  async execute(
    userAuth: IUserAuth,
    createTrainingHistoryDto: CreateTrainingHistoryDto,
  ) {
    const trainingProgram =
      await this.trainingProgramsRepository.getTrainingProgram(
        createTrainingHistoryDto.trainingProgramId,
      );

    const trainingFolder =
      await this.trainingFolderRepository.getTrainingFolder(
        trainingProgram.trainingFolderId,
      );

    if (!trainingProgram || trainingFolder.userId !== userAuth.userId) {
      throw new NotFoundException(
        'o programa de treinamento no qual você esta tentando armazenar, não existe',
      );
    }

    return this.trainingHistoriesRepository.createTrainingHistory(
      createTrainingHistoryDto,
    );
  }
}
