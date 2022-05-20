import { IsUUID, MaxLength, MinLength } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateTrainingProgramDto {
  @MaxLength(100, { message: Msgs.maxLength('description', 100) })
  @MinLength(2, { message: Msgs.minLength('name', 2) })
  @IsNotBlank({ message: Msgs.isNotBlank('name') })
  name: string;

  @IsUUID(null, { message: Msgs.isUUID('trainingFolderId') })
  @IsNotBlank({ message: Msgs.isNotBlank('trainingFolderId') })
  trainingFolderId: string;
}
