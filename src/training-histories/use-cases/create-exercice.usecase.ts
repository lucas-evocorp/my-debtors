import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { TrainingHistoriesRepository } from 'src/training-histories/repositories/training-histories.repository';
import { TrainingFolder } from 'src/trainingies-folders/entities/trainingies-folders.entity';
import { TrainingiesFoldersRepository } from 'src/trainingies-folders/repositories/trainingies-folders.repository';
import { TrainingProgram } from 'src/trainingies-programs/entities/trainingies-programs.entity';
import { TrainingiesProgramsRepository } from 'src/trainingies-programs/repositories/trainingies-programs.repository';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { Exercice } from '../entities/exercices.entity';
import { ExercicesRepository } from '../repositories/exercices.repository';
import { PredefinedsExercicesRepository } from '../repositories/predefineds-exercices.repository';

interface ICheckTrainingFolderExistResponse {
  trainingProgram: TrainingProgram;
  trainingFolder: TrainingFolder;
}

@Injectable()
export class CreateExerciceUseCase {
  constructor(
    private readonly exercicesRepository: ExercicesRepository,
    private readonly predefinedsExercicesRepository: PredefinedsExercicesRepository,
    private readonly trainingHistoriesRepository: TrainingHistoriesRepository,
    private readonly trainingFolderRepository: TrainingiesFoldersRepository,
    private readonly trainingProgramsRepository: TrainingiesProgramsRepository,
  ) {}

  async getTrainingFolderOrFail(trainingFolderId: string) {
    const trainingFolder =
      await this.trainingFolderRepository.getTrainingFolder(trainingFolderId);

    if (!trainingFolder) {
      throw new NotFoundException(
        'a pasta na qual pertence o programa de treinamento, não existe',
      );
    }

    return trainingFolder;
  }

  async checkTrainingFolderExist(
    createExerciceDto: CreateExerciceDto,
  ): Promise<ICheckTrainingFolderExistResponse> {
    const trainingHistory =
      await this.trainingHistoriesRepository.getTrainingHistory(
        createExerciceDto.trainingHistoryId,
      );

    const trainingProgram =
      await this.trainingProgramsRepository.getTrainingProgram(
        trainingHistory.trainingProgramId,
      );

    const trainingFolder =
      await this.trainingFolderRepository.getTrainingFolder(
        trainingProgram.trainingFolderId,
      );

    return {
      trainingProgram,
      trainingFolder,
    };
  }

  async execute(
    userAuth: IUserAuth,
    createExerciceDto: CreateExerciceDto,
  ): Promise<Exercice> {
    await this.predefinedsExercicesRepository.getPredefinedExercice(
      createExerciceDto.predefinedExerciceId,
    );

    const { trainingFolder, trainingProgram } =
      await this.checkTrainingFolderExist(createExerciceDto);

    if (!trainingProgram || trainingFolder.userId !== userAuth.userId) {
      throw new NotFoundException(
        'Ops.. o historico de treino que você tentou armazenar esse exercicio não existe!',
      );
    }

    return await this.exercicesRepository.createExercice(createExerciceDto);
  }
}
