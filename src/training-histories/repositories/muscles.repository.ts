import { EntityRepository, Repository } from 'typeorm';
import { Muscle } from '../entities/muscles.entity';

@EntityRepository(Muscle)
export class MusclesRepository extends Repository<Muscle> {
  constructor() {
    super();
  }
  async getMusclesAndExercices(): Promise<Muscle[]> {
    return await this.createQueryBuilder('muscles')
      .leftJoinAndSelect('muscles.predefinedExercice', 'predefinedExercice')
      .select(['muscles', 'predefinedExercice.id', 'predefinedExercice.name'])
      .getMany();
  }
}
