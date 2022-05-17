import { Injectable, NotFoundException } from '@nestjs/common';
import { Exercice } from '../entities/exercices.entity';
import { ExercicesRepository } from '../repositories/exercices-repository';

@Injectable()
export class ListUserExercicesByTrainingProgramUseCase {
  constructor(private readonly exercicesRepository: ExercicesRepository) {}

  async execute(trainingProgramId: number): Promise<Exercice[]> {
    const exercicesByTrainingProgram =
      await this.exercicesRepository.getUserExercicesByTrainingPrograms(
        trainingProgramId,
      );

    if (!exercicesByTrainingProgram) {
      throw new NotFoundException('Você não possui nenhum exercicio!');
    }

    return exercicesByTrainingProgram;
  }
}
