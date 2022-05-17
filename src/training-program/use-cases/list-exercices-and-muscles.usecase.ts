import { Injectable } from '@nestjs/common';
import { MusclesRepository } from '../repositories/muscles-repository';

@Injectable()
export class ListMusclesAndExercicesUseCase {
  constructor(private readonly musclesRepository: MusclesRepository) {}

  async execute() {
    return await this.musclesRepository.getMusclesAndExercices();
  }
}
