import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateTrainingHistoryDto {
  @IsString({ message: Msgs.isString('name') })
  @IsNotBlank({ message: Msgs.isNotBlank('name') })
  name: string;

  @IsNumber({}, { message: Msgs.isNumber('trainingProgramId') })
  @IsNotEmpty({ message: Msgs.isNotBlank('trainingProgramId') })
  trainingProgramId: number;
}
