import { MaxLength, MinLength } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateTrainingDto {
  @MaxLength(100, { message: Msgs.maxLength('description', 100) })
  @MinLength(2, { message: Msgs.minLength('name', 2) })
  @IsNotBlank({ message: Msgs.isNotBlank('name') })
  name: string;
}
