import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingiesRepository } from './repositories/trainingies-repository';
import { TrainingiesController } from './controllers/trainings.controller';
import { CreateTrainingUseCase } from './use-cases/create-training.usecase';
import { UpdateTrainingUseCase } from './use-cases/update-training.usecase.dto';
import { CreateExerciceUseCase } from './use-cases/create-exercice.usecase';
import { ExercicesController } from './controllers/exercices.controller';
import { ExercicesRepository } from './repositories/exercices-repository';
import { PredefinedsExercicesRepository } from './repositories/predefineds-exercices.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrainingiesRepository,
      ExercicesRepository,
      PredefinedsExercicesRepository,
    ]),
  ],
  controllers: [TrainingiesController, ExercicesController],
  providers: [
    CreateTrainingUseCase,
    UpdateTrainingUseCase,
    CreateExerciceUseCase,
  ],
})
export class TrainingsModule {}
