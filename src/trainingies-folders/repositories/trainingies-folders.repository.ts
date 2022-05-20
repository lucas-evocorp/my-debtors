import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTrainingFolderDto } from '../dtos/create-training-folder.dto';
import { TrainingFolder } from '../entities/trainingies-folders.entity';

@EntityRepository(TrainingFolder)
export class TrainingiesFoldersRepository extends Repository<TrainingFolder> {
  constructor() {
    super();
  }
  async createTrainingFolder(
    userAuth: IUserAuth,
    createTrainingFolderDto: CreateTrainingFolderDto,
  ): Promise<TrainingFolder> {
    const newTrainingFolder = this.create({
      description: createTrainingFolderDto.description,
      userId: userAuth.userId,
      name: createTrainingFolderDto.name,
    });
    console.log(newTrainingFolder);

    return this.save(newTrainingFolder);
  }

  async getTrainingFolder(id: string): Promise<TrainingFolder> {
    return this.findOne(id);
  }

  async findUserTrainingiesFolders(
    userAuth: IUserAuth,
  ): Promise<TrainingFolder[]> {
    return this.find({
      where: { userId: userAuth.userId },
      select: ['id', 'description', 'name'],
    });
  }

  async findTrainingiesProgramsByTrainingFolder(
    id: string,
  ): Promise<TrainingFolder[]> {
    return this.createQueryBuilder('trainingies_folders')
      .leftJoinAndSelect(
        'trainingies_folders.trainingPrograms',
        'trainingProgram',
      )
      .andWhere('trainingies_folders.id = :id', { id })
      .select([
        'trainingies_folders.id',
        'trainingProgram.id',
        'trainingProgram.name',
        'trainingProgram.createdAt',
      ])
      .getMany();
  }
}
