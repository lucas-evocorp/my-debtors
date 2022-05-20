import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { TrainingiesProgramsRepository } from '../repositories/trainingies-programs.repository';

@Injectable()
export class UpdateTrainingProgramUseCase {
  constructor(
    private readonly trainingiesProgramsRepository: TrainingiesProgramsRepository,
  ) {}

  async updateTraining(
    id: number,
    updateTrainingDto: UpdateTrainingDto,
  ): Promise<UpdateResult> {
    return await this.trainingiesProgramsRepository.updateTrainingProgam(
      id,
      updateTrainingDto,
    );
  }

  async execute(
    id: number,
    updateTrainingDto: UpdateTrainingDto,
  ): Promise<UpdateResult> {
    const updateTraining = await this.updateTraining(id, updateTrainingDto);
    return updateTraining;
  }
}
