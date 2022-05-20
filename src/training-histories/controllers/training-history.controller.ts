import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/core/decorators/user-auth';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { CreateTrainingHistoryDto } from '../dtos/create-training-history.dto';
import { CreateExerciceSerieUseCase } from '../use-cases/create-exercice-serie.usecase';
import { CreateExerciceUseCase } from '../use-cases/create-exercice.usecase';
import { CreateTrainingHistoryUseCase } from '../use-cases/create-training-history.usecase';
import { ListAllTrainingHistoryDataUseCase } from '../use-cases/list-all-training-history-data.usecase';
import { ListMusclesAndExercicesUseCase } from '../use-cases/list-exercices-and-muscles.usecase';
import { ListMusclesAndExercicesByTrainingHistoryUseCase } from '../use-cases/list-muscles-and-exercices-by-trainingies-programs.usecase';

@UseGuards(AuthGuard('jwt'))
@Controller('training-histories')
@ApiTags('training-histories')
@ApiBearerAuth()
export class TrainingHistoriesController {
  constructor(
    private readonly CreatetrainingHistoriesUseCase: CreateTrainingHistoryUseCase,
    private readonly listMusclesAndExercicesUseCase: ListMusclesAndExercicesUseCase,
    private readonly createExercicesSeriesUseCase: CreateExerciceSerieUseCase,
    private readonly createExerciceUseCase: CreateExerciceUseCase,
    private readonly listExercicesByTrainingHistoryUseCase: ListMusclesAndExercicesByTrainingHistoryUseCase,
    private readonly listAllTrainingHistoriesData: ListAllTrainingHistoryDataUseCase,
  ) {}

  @Post('create')
  async createTrainingHistory(
    @UserAuth() userAuth: IUserAuth,
    @Body() createTrainingHistoryDto: CreateTrainingHistoryDto,
  ): Promise<IResponseApiData> {
    const newTrainingHistoryDto =
      await this.CreatetrainingHistoriesUseCase.execute(
        userAuth,
        createTrainingHistoryDto,
      );

    return responseApiData(newTrainingHistoryDto);
  }

  @Get('exercices/muscles-and-exercices')
  async listMusclesAndExercices(): Promise<IResponseApiData> {
    const musclesAndExercices =
      await this.listMusclesAndExercicesUseCase.execute();

    return responseApiData(musclesAndExercices, 'busca realizada com sucesso!');
  }
  @Post('create-exercice')
  async createExercice(
    @UserAuth() userAuth: IUserAuth,
    @Body() createExerciceDto: CreateExerciceDto,
  ): Promise<IResponseApiData> {
    const newExercice = await this.createExerciceUseCase.execute(
      userAuth,
      createExerciceDto,
    );

    return responseApiData(newExercice, 'exercicio criado com sucesso');
  }

  @Post('create-exercice-serie')
  async createExerciceSerie(
    @Body() createSerieDto: CreateSerieDto,
  ): Promise<IResponseApiData> {
    const newSerie = await this.createExercicesSeriesUseCase.execute(
      createSerieDto,
    );

    return responseApiData(newSerie);
  }

  @Get(':trainingHistoryId/exercices')
  async listExercicesByTrainingHistory(
    @Param('trainingHistoryId') trainingHistoryId: string,
  ) {
    const exercices = await this.listExercicesByTrainingHistoryUseCase.execute(
      trainingHistoryId,
    );

    return responseApiData(exercices);
  }

  @Get(':trainingHistoryId')
  async getAllTrainingHistoriesData(
    @Param('trainingHistoryId') trainingHistoryId: string,
  ) {
    const exercices = await this.listAllTrainingHistoriesData.execute(
      trainingHistoryId,
    );

    return responseApiData(exercices);
  }
}
