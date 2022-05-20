import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateTrainingProgramDto } from '../dtos/create-training-program.dto';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { TrainingProgram } from '../entities/trainingies-programs.entity';

@EntityRepository(TrainingProgram)
export class TrainingiesProgramsRepository extends Repository<TrainingProgram> {
  constructor() {
    super();
  }

  async createTrainingProgram(
    createTrainingDto: CreateTrainingProgramDto,
  ): Promise<TrainingProgram> {
    const newTraining = this.create({
      name: createTrainingDto.name,
      trainingFolderId: createTrainingDto.trainingFolderId,
      createdAt: new Date(),
    });

    return await this.save(newTraining);
  }

  async updateTrainingProgam(
    id: number,
    updateTrainingDto: UpdateTrainingDto,
  ): Promise<UpdateResult> {
    return await this.update(id, updateTrainingDto);
  }

  async getTrainingProgram(id: number): Promise<TrainingProgram> {
    return await this.findOne(id);
  }

  async findTrainingHistoriesByTrainingPrograms(trainingProgramId: number) {
    console.log('trainingProgramId');

    return await this.createQueryBuilder('training_histories')
      .where('trainingProgramId = :id', { id: trainingProgramId })
      .select(['trainingies_programs.id', 'training_histories'])
      .getMany();
  }
}
