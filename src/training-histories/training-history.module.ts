import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingiesFoldersModule } from 'src/trainingies-folders/training-folders.module';
import { TrainingiesProgramsModule } from 'src/trainingies-programs/trainings.module';
import { getTrainingProgramUseCase } from 'src/trainingies-programs/use-cases/get-training-program.usecase';
import { TrainingHistoriesController } from './controllers/training-history.controller';
import { ExercicesRepository } from './repositories/exercices.repository';
import { MusclesRepository } from './repositories/muscles.repository';
import { PredefinedsExercicesRepository } from './repositories/predefineds-exercices.repository';
import { SeriesRepository } from './repositories/series.repository';
import { TrainingHistoriesRepository } from './repositories/training-histories.repository';
import { CreateExerciceSerieUseCase } from './use-cases/create-exercice-serie.usecase';
import { CreateExerciceUseCase } from './use-cases/create-exercice.usecase';
import { CreateTrainingHistoryUseCase } from './use-cases/create-training-history.usecase';
import { ListAllTrainingHistoryDataUseCase } from './use-cases/list-all-training-history-data.usecase';
import { ListMusclesAndExercicesUseCase } from './use-cases/list-exercices-and-muscles.usecase';
import { ListMusclesAndExercicesByTrainingHistoryUseCase } from './use-cases/list-muscles-and-exercices-by-trainingies-programs.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingHistoriesRepository,
      MusclesRepository,
      ExercicesRepository,
      PredefinedsExercicesRepository,
      SeriesRepository,
    ]),
    TrainingiesFoldersModule,
    forwardRef(() => TrainingiesProgramsModule),
  ],

  exports: [TypeOrmModule],
  controllers: [TrainingHistoriesController],
  providers: [
    CreateTrainingHistoryUseCase,
    CreateExerciceUseCase,
    ListMusclesAndExercicesByTrainingHistoryUseCase,
    getTrainingProgramUseCase,
    ListMusclesAndExercicesUseCase,
    CreateExerciceSerieUseCase,
    ListAllTrainingHistoryDataUseCase,
  ],
})
export class TrainingHistoriesModule {}
