import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/core/decorators/user-auth';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateExerciceDto } from '../dtos/create-exercice.dto';
import { CreateExerciceUseCase } from '../use-cases/create-exercice.usecase';

@Controller('exercices')
@UseGuards(AuthGuard('jwt'))
@ApiTags('exercices')
@ApiBearerAuth()
export class ExercicesController {
  constructor(private readonly createExerciceUseCase: CreateExerciceUseCase) {}
  @Post()
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
