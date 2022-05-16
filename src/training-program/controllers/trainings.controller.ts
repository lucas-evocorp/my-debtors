import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/core/decorators/user-auth';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { CreateTrainingUseCase } from '../use-cases/create-training.usecase';
import { UpdateTrainingUseCase } from '../use-cases/update-training.usecase.dto';

@Controller('trainings')
@UseGuards(AuthGuard('jwt'))
@ApiTags('trainings')
export class TrainingiesController {
  constructor(
    private createTrainingUseCase: CreateTrainingUseCase,
    private updateTrainingUseCase: UpdateTrainingUseCase,
  ) {}

  @Post()
  async trainingProgram(
    @UserAuth() userAuth: IUserAuth,
    @Body() createTrainingDto: CreateTrainingDto,
  ): Promise<IResponseApiData> {
    const createTraining = await this.createTrainingUseCase.execute(
      createTrainingDto,
      userAuth,
    );

    return responseApiData(
      createTraining,
      'programa de treinamento criado com sucesso',
    );
  }

  @Put(':id')
  async updateTrainingProgram(
    @Param('id') id: number,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ): Promise<IResponseApiData> {
    const updateTraining = await this.updateTrainingUseCase.execute(
      id,
      updateTrainingDto,
    );

    return responseApiData(
      updateTraining,
      'programa de treinos alterado com sucesso!',
    );
  }
}
