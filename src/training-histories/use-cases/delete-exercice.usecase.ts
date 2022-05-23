import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { TrainingiesFoldersRepository } from 'src/trainingies-folders/repositories/trainingies-folders.repository';
import { TrainingiesProgramsRepository } from 'src/trainingies-programs/repositories/trainingies-programs.repository';
import { DeleteResult } from 'typeorm';
import { ExercicesRepository } from '../repositories/exercices.repository';
import { TrainingHistoriesRepository } from '../repositories/training-histories.repository';

@Injectable()
export class DeleteExerciceUseCase {
  constructor(
    private readonly exercicesRepository: ExercicesRepository,
    private readonly trainingHistoriesRepository: TrainingHistoriesRepository,
    private readonly trainingProgramRepository: TrainingiesProgramsRepository,
    private readonly trainingFoldersRepository: TrainingiesFoldersRepository,
  ) {}

  async checkExerciceExist(userAuth: IUserAuth, exerciceId: string) {
    const exercice = await this.exercicesRepository.getExercice(exerciceId);

    const trainingHistory =
      await this.trainingHistoriesRepository.getTrainingHistory(
        exercice.trainingHistoriesId,
      );

    const trainingProgram =
      await this.trainingProgramRepository.getTrainingProgram(
        trainingHistory.trainingProgramId,
      );

    const trainingFolder =
      await this.trainingFoldersRepository.getTrainingFolder(
        trainingProgram.trainingFolderId,
      );

    if (!exercice || trainingFolder.userId !== userAuth.userId) {
      throw new NotFoundException(
        'O exercicio no qual você esta querendo deletar, nao existe!',
      );
    }
  }

  async execute(
    userAuth: IUserAuth,
    exerciceId: string,
  ): Promise<DeleteResult> {
    await this.checkExerciceExist(userAuth, exerciceId);

    return await this.exercicesRepository.deleteExercice(exerciceId);
  }
}
