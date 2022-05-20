import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/core/decorators/user-auth';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateTrainingProgramDto } from '../dtos/create-training-program.dto';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { CreateTrainingProgramUseCase } from '../use-cases/create-training-program.usecase';
import { GetTrainingHistoriesByTrainingProgramUseCase } from '../use-cases/get-training-histories-by-training-programs.usecase';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getTrainingProgramUseCase } from '../use-cases/get-training-program.usecase';
import { UpdateTrainingProgramUseCase } from '../use-cases/update-training.usecase.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('training-programs')
@ApiTags('trainings-programs')
@ApiBearerAuth()
export class TrainingiesProgramController {
  constructor(
    private readonly createTrainingProgramUseCase: CreateTrainingProgramUseCase,
    private readonly updateTrainingProgramUseCase: UpdateTrainingProgramUseCase,
    private readonly getTrainingProgramUseCase: getTrainingProgramUseCase,
    private readonly getTrainingHistoriesByTrainingProgramUseCase: GetTrainingHistoriesByTrainingProgramUseCase,
  ) {}

  @Post('create')
  async createTrainingProgram(
    @UserAuth() userAuth: IUserAuth,
    @Body() createTrainingDto: CreateTrainingProgramDto,
  ): Promise<IResponseApiData> {
    const createTraining = await this.createTrainingProgramUseCase.execute(
      userAuth,
      createTrainingDto,
    );

    return responseApiData(
      createTraining,
      'programa de treinamento criado com sucesso',
    );
  }

  @Get(':id')
  async getTrainingProgram(
    @Param('id')
    id: number,
  ): Promise<IResponseApiData> {
    const getTrainingProgram = await this.getTrainingProgramUseCase.execute(id);

    return responseApiData({
      id: getTrainingProgram.id,
      name: getTrainingProgram.name,
      createdAt: getTrainingProgram.createdAt,
    });
  }

  @Get(':trainingProgramId/training-histories')
  async listTrainingHistoriesByTrainingPrograms(
    @Param('trainingProgramId') trainingProgramId: number,
  ): Promise<IResponseApiData> {
    const trainingHistories =
      await this.getTrainingHistoriesByTrainingProgramUseCase.execute(
        trainingProgramId,
      );

    return responseApiData(trainingHistories);
  }

  @Put(':id')
  async updateTrainingProgram(
    @Param('id') id: number,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ): Promise<IResponseApiData> {
    const updateTraining = await this.updateTrainingProgramUseCase.execute(
      id,
      updateTrainingDto,
    );

    return responseApiData(
      updateTraining,
      'informações do programa de treinamento alterada com sucesso!',
    );
  }
}
