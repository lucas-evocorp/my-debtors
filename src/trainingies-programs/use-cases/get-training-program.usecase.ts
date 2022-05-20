import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingProgram } from '../entities/trainingies-programs.entity';
import { TrainingiesProgramsRepository } from '../repositories/trainingies-programs.repository';

@Injectable()
export class getTrainingProgramUseCase {
  constructor(
    private readonly trainingiesProgramsRepository: TrainingiesProgramsRepository,
  ) {}

  async execute(id: number): Promise<TrainingProgram> {
    const trainingProgram =
      await this.trainingiesProgramsRepository.getTrainingProgram(id);

    if (!trainingProgram) {
      throw new NotFoundException('Programa de Treinamento não encontrado!');
    }

    return trainingProgram;
  }
}
