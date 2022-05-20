import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/core/decorators/user-auth';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateTrainingFolderDto } from '../dtos/create-training-folder.dto';
import { CreateTrainingFolderUseCase } from '../use-cases/create-training-folder.usecase';
import { listTrainingiesProgramsByTrainingFolderUseCase } from '../use-cases/list-trainingies-programs-by-training-folder.usecase';
import { ListUserTrainingiesFoldersUseCase } from '../use-cases/list-user-trainingies-folders.usecase';

@Controller('training-folders')
@UseGuards(AuthGuard('jwt'))
@ApiTags('training-folders')
@ApiBearerAuth()
export class TrainingiesFoldersController {
  constructor(
    private readonly createTrainingFolderUseCase: CreateTrainingFolderUseCase,
    private readonly listUserTrainingiesFoldersUseCase: ListUserTrainingiesFoldersUseCase,
    private readonly listTrainingsProgramsByTrainingFoldersUseCase: listTrainingiesProgramsByTrainingFolderUseCase,
  ) {}

  @Post('create')
  async createTrainingFolder(
    @UserAuth() userAuth: IUserAuth,
    @Body() createTrainingFolderDto: CreateTrainingFolderDto,
  ): Promise<IResponseApiData> {
    const newTrainingFolder = await this.createTrainingFolderUseCase.execute(
      userAuth,
      createTrainingFolderDto,
    );

    return responseApiData(
      {
        id: newTrainingFolder.id,
        name: newTrainingFolder.name,
        description: newTrainingFolder.description,
      },
      `a pasta ${newTrainingFolder.name} foi criada com sucesso!`,
    );
  }
  @Get()
  async findUserTrainingiesFolders(@UserAuth() userAuth: IUserAuth) {
    const userTrainingiesFolders =
      await this.listUserTrainingiesFoldersUseCase.execute(userAuth);

    return responseApiData(userTrainingiesFolders, 'pastas de treinamento');
  }

  @Get(':trainingFolderId/training-programs')
  async findTrainingiesProgramsByTrainingiesFolders(
    @Param('trainingFolderId') trainingFolderId: string,
    @UserAuth() userAuth: IUserAuth,
  ) {
    const userTrainingiesFolders =
      await this.listTrainingsProgramsByTrainingFoldersUseCase.execute(
        userAuth,
        trainingFolderId,
      );

    return responseApiData(userTrainingiesFolders);
  }
}
