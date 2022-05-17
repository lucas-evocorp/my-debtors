import { EntityRepository, Repository } from 'typeorm';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { Exercice } from '../entities/exercices.entity';

@EntityRepository(Exercice)
export class ExercicesRepository extends Repository<Exercice> {
  async createExercice(createExerciceDto: CreateExerciceDto) {
    const newExercice = this.create({
      predefinedExerciceId: createExerciceDto.predefinedExerciceId,
      series: createExerciceDto.series,
      trainingProgramId: createExerciceDto.trainingId,
      weight: createExerciceDto.weight,
    });

    return this.save(newExercice);
  }

  async getUserExercicesByTrainingPrograms(trainingProgramId: number) {
    return await this.createQueryBuilder('exercices')
      .leftJoinAndSelect('exercices.predefinedExercice', 'predefinedExercice')
      .where('exercices.trainingProgramId = :id', {
        id: trainingProgramId,
      })
      .select([
        'exercices.id',
        'exercices.series',
        'exercices.weight',
        'predefinedExercice',
      ])
      .getMany();
  }
}
