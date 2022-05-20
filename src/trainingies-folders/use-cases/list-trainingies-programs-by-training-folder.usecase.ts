import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { TrainingFolder } from '../entities/trainingies-folders.entity';
import { TrainingiesFoldersRepository } from '../repositories/trainingies-folders.repository';

@Injectable()
export class listTrainingiesProgramsByTrainingFolderUseCase {
  constructor(
    private readonly trainingiesFoldersRepository: TrainingiesFoldersRepository,
  ) {}

  async execute(
    userAuth: IUserAuth,
    trainingFolderId: string,
  ): Promise<TrainingFolder[]> {
    const trainingFolder =
      await this.trainingiesFoldersRepository.getTrainingFolder(
        trainingFolderId,
      );

    const trainingPrograms =
      await this.trainingiesFoldersRepository.findTrainingiesProgramsByTrainingFolder(
        trainingFolderId,
      );

    if (!trainingPrograms) {
      throw new NotFoundException(
        'Você não possui programas de treinamento armazenados nessa pasta',
      );
    }
    return trainingPrograms;
  }
}
