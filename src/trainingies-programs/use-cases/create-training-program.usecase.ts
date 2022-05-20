import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { TrainingiesFoldersRepository } from 'src/trainingies-folders/repositories/trainingies-folders.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CreateTrainingProgramDto } from '../dtos/create-training-program.dto';
import { TrainingProgram } from '../entities/trainingies-programs.entity';
import { TrainingiesProgramsRepository } from '../repositories/trainingies-programs.repository';

@Injectable()
export class CreateTrainingProgramUseCase {
  constructor(
    private readonly trainingiesProgramsRepository: TrainingiesProgramsRepository,
    private readonly trainingiesFoldersRepository: TrainingiesFoldersRepository,
  ) {}

  async execute(
    userAuth: IUserAuth,
    createTrainingDto: CreateTrainingProgramDto,
  ): Promise<TrainingProgram> {
    const trainingFolder =
      await this.trainingiesFoldersRepository.getTrainingFolder(
        createTrainingDto.trainingFolderId,
      );

    if (!trainingFolder || trainingFolder.userId !== userAuth.userId) {
      throw new NotFoundException(
        'A pasta na qual você esta tentando armazenar esse programa de treinamentos, não existe!',
      );
    }
    return await this.trainingiesProgramsRepository.createTrainingProgram(
      createTrainingDto,
    );
  }
}
