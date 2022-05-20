import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingiesFoldersController } from './controllers/trainingies-folders.controller';
import { TrainingiesFoldersRepository } from './repositories/trainingies-folders.repository';
import { CreateTrainingFolderUseCase } from './use-cases/create-training-folder.usecase';
import { listTrainingiesProgramsByTrainingFolderUseCase } from './use-cases/list-trainingies-programs-by-training-folder.usecase';
import { ListUserTrainingiesFoldersUseCase } from './use-cases/list-user-trainingies-folders.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingiesFoldersRepository])],
  controllers: [TrainingiesFoldersController],
  exports: [TypeOrmModule],

  providers: [
    CreateTrainingFolderUseCase,
    ListUserTrainingiesFoldersUseCase,
    listTrainingiesProgramsByTrainingFolderUseCase,
  ],
})
export class TrainingiesFoldersModule {}
