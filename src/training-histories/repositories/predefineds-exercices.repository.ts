import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PredefinedExercice } from '../entities/predefined-exercices.entity';

@EntityRepository(PredefinedExercice)
export class PredefinedsExercicesRepository extends Repository<PredefinedExercice> {
  constructor() {
    super();
  }
  async getPredefinedExercice(id: number) {
    const predefinedExercice = await this.findOne(id);
    console.log(predefinedExercice);

    if (!predefinedExercice) {
      throw new NotFoundException(
        'Exercicio buscado não esta entre os existentes!',
      );
    }

    return predefinedExercice;
  }
}
