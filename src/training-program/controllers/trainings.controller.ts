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
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/core/decorators/user-auth';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { CreateTrainingDto } from '../dtos/create-training.dto';
import { UpdateTrainingDto } from '../dtos/update-training.dto';
import { CreateExerciceUseCase } from '../use-cases/create-exercice.usecase';
import { CreateTrainingProgramUseCase } from '../use-cases/create-training.usecase';
import { getTrainingProgramUseCase } from '../use-cases/get-training-program.usecase';
import { ListMusclesAndExercicesUseCase } from '../use-cases/list-exercices-and-muscles.usecase';
import { listUserTrainingiesProgramsUseCase } from '../use-cases/list-trainings.usecase';
import { ListUserExercicesByTrainingProgramUseCase } from '../use-cases/list-user-exercices-by-trainingies-programs.usecase';
import { UpdateTrainingProgramUseCase } from '../use-cases/update-training.usecase.dto';

@Controller('trainingies-programs')
@UseGuards(AuthGuard('jwt'))
@ApiTags('trainings-programs')
export class TrainingiesProgramController {
  constructor(
    private readonly createTrainingProgramUseCase: CreateTrainingProgramUseCase,
    private readonly updateTrainingProgramUseCase: UpdateTrainingProgramUseCase,
    private readonly getUserTrainingiesProgramsUseCase: listUserTrainingiesProgramsUseCase,
    private readonly createExerciceUseCase: CreateExerciceUseCase,
    private readonly getUserExercicesByTrainingProgramUseCase: ListUserExercicesByTrainingProgramUseCase,
    private readonly getTrainingProgramUseCase: getTrainingProgramUseCase,
    private readonly listMusclesAndExercicesUseCase: ListMusclesAndExercicesUseCase,
  ) {}

  @Post()
  async createTrainingProgram(
    @UserAuth() userAuth: IUserAuth,
    @Body() createTrainingDto: CreateTrainingDto,
  ): Promise<IResponseApiData> {
    const createTraining = await this.createTrainingProgramUseCase.execute(
      createTrainingDto,
      userAuth,
    );

    return responseApiData(
      createTraining,
      'programa de treinamento criado com sucesso',
    );
  }

  @Get()
  async getUserTrainingiesPrograms(
    @UserAuth() userAuth: IUserAuth,
  ): Promise<IResponseApiData> {
    const userTrainingiesPrograms =
      await this.getUserTrainingiesProgramsUseCase.execute(userAuth);

    return responseApiData(
      userTrainingiesPrograms,
      'busca realizada com sucesso!',
    );
  }

  @Get('muscles-and-exercices')
  async listMusclesAndExercices(): Promise<IResponseApiData> {
    const musclesAndExercices =
      await this.listMusclesAndExercicesUseCase.execute();

    return responseApiData(musclesAndExercices, 'busca realizada com sucesso!');
  }

  @Get(':id')
  async getTrainingProgram(
    @UserAuth() userAuth: IUserAuth,
    @Param('id')
    id: number,
  ): Promise<IResponseApiData> {
    const getTrainingProgram = await this.getTrainingProgramUseCase.execute(
      userAuth,
      id,
    );

    return responseApiData({
      id: getTrainingProgram.id,
      name: getTrainingProgram.name,
      createdAt: getTrainingProgram.createdAt,
    });
  }

  @Get(':trainingProgramId/exercices')
  async listUserExercicesByTrainingProgram(
    @Param('trainingProgramId') trainingProgramId: number,
  ): Promise<IResponseApiData> {
    const userExercicesByTrainingProgram =
      await this.getUserExercicesByTrainingProgramUseCase.execute(
        trainingProgramId,
      );

    return responseApiData(userExercicesByTrainingProgram);
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

  @Post('create-exercice')
  async createExercice(
    @UserAuth() userAuth: IUserAuth,
    @Body() createExerciceDto: CreateExerciceDto,
  ) {
    const newExercice = await this.createExerciceUseCase.execute(
      userAuth,
      createExerciceDto,
    );

    return responseApiData(newExercice, 'exercicio criado com sucesso');
  }
}
