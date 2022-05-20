import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateExerciceDto {
  @IsUUID(null, { message: Msgs.isUUID('trainingProgramId') })
  @IsNotBlank({ message: Msgs.isNotBlank('trainingProgramId') })
  trainingHistoryId: string;

  @IsNumber({}, { message: Msgs.isNumber('predefinedExercicesId') })
  @IsNotEmpty({ message: Msgs.isNotBlank('predefinedExercicesId') })
  predefinedExerciceId: number;
}
