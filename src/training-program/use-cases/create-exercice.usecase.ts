import { Injectable, NotFoundException } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { Exercice } from '../entities/exercices.entity';
import { ExercicesRepository } from '../repositories/exercices-repository';
import { PredefinedsExercicesRepository } from '../repositories/predefineds-exercices.repository';
import { TrainingiesRepository } from '../repositories/trainingies-repository';

@Injectable()
export class CreateExerciceUseCase {
  constructor(
    private exercicesRepository: ExercicesRepository,
    private predefinedsExercicesRepository: PredefinedsExercicesRepository,
    private trainingiesRepository: TrainingiesRepository,
  ) {}

  async execute(
    userAuth: IUserAuth,
    createExerciceDto: CreateExerciceDto,
  ): Promise<Exercice> {
    await this.predefinedsExercicesRepository.getPredefinedExercice(
      createExerciceDto.predefinedExerciceId,
    );

    const trainingProgram = await this.trainingiesRepository.getTrainingProgram(
      createExerciceDto.trainingId,
    );

    if (trainingProgram.userId !== userAuth.userId) {
      throw new NotFoundException(
        'Ops.. o programa de treino que você tentou armazenar esse exercicio, não existe ou não esta armazenado em sua conta!',
      );
    }

    return await this.exercicesRepository.createExercice(createExerciceDto);
  }
}
