import { Injectable } from '@nestjs/common';
import { Muscle } from '../entities/muscles.entity';
import { MusclesRepository } from '../repositories/muscles.repository';

@Injectable()
export class ListMusclesAndExercicesUseCase {
  constructor(private readonly musclesRepository: MusclesRepository) {}

  async execute(): Promise<Muscle[]> {
    return await this.musclesRepository.getMusclesAndExercices();
  }
}
