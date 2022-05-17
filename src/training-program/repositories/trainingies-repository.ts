import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { Training } from '../entities/trainings.entity';

@EntityRepository(Training)
export class TrainingiesRepository extends Repository<Training> {
  async createTrainingProgram(
    createTrainingDto: CreateTrainingDto,
    userAuth: IUserAuth,
  ): Promise<Training> {
    const newTraining = this.create({
      name: createTrainingDto.name,
      userId: userAuth.userId,
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

  async getTrainingProgram(id: number): Promise<Training> {
    return await this.findOne(id);
  }

  async getUserTrainingiesPrograms(userAuth: IUserAuth): Promise<Training[]> {
    return this.find({
      where: { userId: userAuth.userId },
      select: ['name'],
    });
  }
}
