import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { TrainingiesRepository } from '../repositories/trainingies-repository';

@Injectable()
export class getTrainingProgramUseCase {
  constructor(
    private readonly trainingiesProgramsRepository: TrainingiesRepository,
  ) {}
  async execute(userAuth: IUserAuth, id: number) {
    const trainingProgram =
      await this.trainingiesProgramsRepository.getTrainingProgram(id);

    if (!trainingProgram || trainingProgram.userId !== userAuth.userId) {
      throw new NotFoundException('Programa de Treinamento não encontrado!');
    }

    return trainingProgram;
  }
}
