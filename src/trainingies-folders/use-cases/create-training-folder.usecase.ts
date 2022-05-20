import { Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { CreateTrainingFolderDto } from '../dtos/create-training-folder.dto';
import { TrainingFolder } from '../entities/trainingies-folders.entity';
import { TrainingiesFoldersRepository } from '../repositories/trainingies-folders.repository';

@Injectable()
export class CreateTrainingFolderUseCase {
  constructor(
    private readonly trainingiesFoldersRepository: TrainingiesFoldersRepository,
  ) {}

  async execute(
    userAuth: IUserAuth,
    createTrainingFolderDto: CreateTrainingFolderDto,
  ): Promise<TrainingFolder> {
    return await this.trainingiesFoldersRepository.createTrainingFolder(
      userAuth,
      createTrainingFolderDto,
    );
  }
}
