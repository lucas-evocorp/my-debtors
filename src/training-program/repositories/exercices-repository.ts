import { EntityRepository, Repository } from 'typeorm';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { Exercice } from '../entities/exercices.entity';

@EntityRepository(Exercice)
export class ExercicesRepository extends Repository<Exercice> {
  async createExercice(createExerciceDto: CreateExerciceDto) {
    const newExercice = this.create({
      predefinedExerciceId: createExerciceDto.predefinedExerciceId,
      series: createExerciceDto.series,
      trainingId: createExerciceDto.trainingId,
      weight: createExerciceDto.weight,
    });

    return this.save(newExercice);
  }
}
