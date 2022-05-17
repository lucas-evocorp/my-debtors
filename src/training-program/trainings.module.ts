import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingiesRepository } from './repositories/trainingies-repository';
import { TrainingiesProgramController } from './controllers/trainings.controller';
import { CreateTrainingProgramUseCase } from './use-cases/create-training.usecase';
import { UpdateTrainingProgramUseCase } from './use-cases/update-training.usecase.dto';
import { CreateExerciceUseCase } from './use-cases/create-exercice.usecase';
import { ExercicesRepository } from './repositories/exercices-repository';
import { PredefinedsExercicesRepository } from './repositories/predefineds-exercices.repository';
import { ListUserExercicesByTrainingProgramUseCase } from './use-cases/list-user-exercices-by-trainingies-programs.usecase';
import { getTrainingProgramUseCase } from './use-cases/get-training-program.usecase';
import { listUserTrainingiesProgramsUseCase } from './use-cases/list-trainings.usecase';
import { ListMusclesAndExercicesUseCase } from './use-cases/list-exercices-and-muscles.usecase';
import { MusclesRepository } from './repositories/muscles-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingiesRepository,
      ExercicesRepository,
      PredefinedsExercicesRepository,
      MusclesRepository,
    ]),
  ],
  controllers: [TrainingiesProgramController],
  providers: [
    CreateTrainingProgramUseCase,
    UpdateTrainingProgramUseCase,
    CreateExerciceUseCase,
    listUserTrainingiesProgramsUseCase,
    ListUserExercicesByTrainingProgramUseCase,
    getTrainingProgramUseCase,
    ListMusclesAndExercicesUseCase,
  ],
})
export class TrainingsModule {}
