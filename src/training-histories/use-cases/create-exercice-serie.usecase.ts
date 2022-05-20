import { Injectable } from '@nestjs/common';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { Serie } from '../entities/series.entity';
import { SeriesRepository } from '../repositories/series.repository';

@Injectable()
export class CreateExerciceSerieUseCase {
  constructor(private readonly seriesRepository: SeriesRepository) {}
  async execute(createSerieDto: CreateSerieDto): Promise<Serie> {
    return await this.seriesRepository.createExerciceSerie(createSerieDto);
  }
}
