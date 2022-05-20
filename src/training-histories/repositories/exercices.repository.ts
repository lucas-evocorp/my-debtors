import { EntityRepository, Repository } from 'typeorm';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { Exercice } from '../entities/exercices.entity';

@EntityRepository(Exercice)
export class ExercicesRepository extends Repository<Exercice> {
  constructor() {
    super();
  }
  async createExercice(createExerciceDto: CreateExerciceDto) {
    const newExercice = this.create({
      predefinedExerciceId: createExerciceDto.predefinedExerciceId,
      trainingHistoriesId: createExerciceDto.trainingHistoryId,
    });

    return this.save(newExercice);
  }

  async getExercicesByTrainingHistory(
    trainingHistoryId: string,
  ): Promise<Exercice[]> {
    return await this.createQueryBuilder('exercices')
      .leftJoinAndSelect('exercices.predefinedExercice', 'predefinedExercice')
      .leftJoinAndSelect('exercices.series', 'serie')
      .leftJoinAndSelect('predefinedExercice.muscles', 'muscle')
      .leftJoinAndSelect('exercices.trainingHistories', 'trainingHistory')

      .where('trainingHistory.id = :id', {
        id: trainingHistoryId,
      })
      .select(['muscle.name', 'exercices.id', 'predefinedExercice', 'serie'])
      .getMany();
  }
}
