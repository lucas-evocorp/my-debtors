import { EntityRepository, Repository } from 'typeorm';
import { CreateTrainingHistoryDto } from '../dtos/create-training-history.dto';
import { TrainingHistory } from '../entities/training-histories.entity';

@EntityRepository(TrainingHistory)
export class TrainingHistoriesRepository extends Repository<TrainingHistory> {
  constructor() {
    super();
  }

  async getTrainingHistory(id: string): Promise<TrainingHistory> {
    return this.findOne(id);
  }

  async createTrainingHistory(
    createTrainingHistoryDto: CreateTrainingHistoryDto,
  ) {
    const newTrainingHistory = this.create({
      name: createTrainingHistoryDto.name,
      createdAt: new Date(),
      trainingProgramId: createTrainingHistoryDto.trainingProgramId,
    });

    return await this.save(newTrainingHistory);
  }

  async listTrainingHistoriesByTrainingProgram(trainingProgramId: number) {
    return this.find({
      where: { trainingProgramId: trainingProgramId },
    });
  }

  async listAllTrainingHistoriesData(trainingHistoryId: string) {
    return this.createQueryBuilder('training_histories')
      .leftJoinAndSelect('training_histories.exercices', 'exercice')
      .leftJoinAndSelect('exercice.predefinedExercice', 'predefinedExercice')
      .leftJoinAndSelect('predefinedExercice.muscles', 'muscle')
      .leftJoinAndSelect('exercice.series', 'serie')
      .where('training_histories.id = :id', {
        id: trainingHistoryId,
      })
      .getMany();
  }
}
