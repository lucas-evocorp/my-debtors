import { Injectable, NotFoundException } from '@nestjs/common';
import { Exercice } from '../entities/exercices.entity';
import { ExercicesRepository } from '../repositories/exercices.repository';

@Injectable()
export class ListMusclesAndExercicesByTrainingHistoryUseCase {
  constructor(private readonly exercicesRepository: ExercicesRepository) {}

  async execute(trainingHistoryId: string): Promise<Exercice[]> {
    const exercicesByTrainingProgram =
      await this.exercicesRepository.getExercicesByTrainingHistory(
        trainingHistoryId,
      );

    if (!exercicesByTrainingProgram) {
      throw new NotFoundException('Você não possui nenhum exercicio!');
    }

    return exercicesByTrainingProgram;
  }
}
