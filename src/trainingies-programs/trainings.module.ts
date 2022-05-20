import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingiesProgramsRepository } from './repositories/trainingies-programs.repository';
import { TrainingiesProgramController } from './controllers/trainingies-programs.controller';
import { CreateTrainingProgramUseCase } from './use-cases/create-training-program.usecase';
import { UpdateTrainingProgramUseCase } from './use-cases/update-training.usecase.dto';
import { getTrainingProgramUseCase } from './use-cases/get-training-program.usecase';
import { TrainingHistoriesModule } from 'src/training-histories/training-history.module';
import { TrainingiesFoldersModule } from 'src/trainingies-folders/training-folders.module';
import { GetTrainingHistoriesByTrainingProgramUseCase } from './use-cases/get-training-histories-by-training-programs.usecase';
@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingiesProgramsRepository]),
    TrainingiesFoldersModule,
    forwardRef(() => TrainingHistoriesModule),
  ],
  exports: [TypeOrmModule],
  controllers: [TrainingiesProgramController],
  providers: [
    CreateTrainingProgramUseCase,
    UpdateTrainingProgramUseCase,
    getTrainingProgramUseCase,
    GetTrainingHistoriesByTrainingProgramUseCase,
  ],
})
export class TrainingiesProgramsModule {}
