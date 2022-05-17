import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { TrainingiesRepository } from '../repositories/trainingies-repository';

@Injectable()
export class UpdateTrainingProgramUseCase {
  constructor(private readonly trainingiesRepository: TrainingiesRepository) {}

  async updateTraining(
    id: number,
    updateTrainingDto: UpdateTrainingDto,
  ): Promise<UpdateResult> {
    return await this.trainingiesRepository.updateTrainingProgam(
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
