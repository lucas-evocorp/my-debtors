import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { TrainingFolder } from '../entities/trainingies-folders.entity';
import { TrainingiesFoldersRepository } from '../repositories/trainingies-folders.repository';

@Injectable()
export class ListUserTrainingiesFoldersUseCase {
  constructor(
    private readonly trainingiesFoldersRepository: TrainingiesFoldersRepository,
  ) {}

  async execute(userAuth: IUserAuth): Promise<TrainingFolder[]> {
    const trainingiesFolders =
      await this.trainingiesFoldersRepository.findUserTrainingiesFolders(
        userAuth,
      );

    if (!trainingiesFolders) {
      throw new NotFoundException(
        'Você não possui nenhuma pasta de treinamento!',
      );
    }

    return trainingiesFolders;
  }
}
