import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { Exercice } from '../entities/exercices.entity';

@EntityRepository(Exercice)
export class ExercicesRepository extends Repository<Exercice> {
  constructor() {
    super();
  }
  createExercice(createExerciceDto: CreateExerciceDto) {
    const newExercice = this.create({
      predefinedExerciceId: createExerciceDto.predefinedExerciceId,
      trainingHistoriesId: createExerciceDto.trainingHistoryId,
    });

    return this.save(newExercice);
  }

  getExercicesByTrainingHistory(
    trainingHistoryId: string,
  ): Promise<Exercice[]> {
    return this.createQueryBuilder('exercices')
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

  getExercice(id: string): Promise<Exercice> {
    return this.findOne(id);
  }

  deleteExercice(id: string): Promise<DeleteResult> {
    return this.delete(id);
  }
}
