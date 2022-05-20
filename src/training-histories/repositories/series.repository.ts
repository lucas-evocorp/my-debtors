import { EntityRepository, Repository } from 'typeorm';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { Serie } from '../entities/series.entity';

@EntityRepository(Serie)
export class SeriesRepository extends Repository<Serie> {
  constructor() {
    super();
  }
  async createExerciceSerie(createSerieDto: CreateSerieDto): Promise<Serie> {
    const newSerie = this.create({
      name: createSerieDto.name,
      weight: createSerieDto.weight,
      exerciceId: createSerieDto.exerciceId,
      repetitions: createSerieDto.repetitions,
    });

    return this.save(newSerie);
  }
}
