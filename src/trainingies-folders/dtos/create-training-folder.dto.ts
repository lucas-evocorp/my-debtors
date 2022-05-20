import { Transform } from 'class-transformer';
import { MaxLength, MinLength } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateTrainingFolderDto {
  @MaxLength(200, { message: Msgs.maxLength('name', 200) })
  @MinLength(2, { message: Msgs.minLength('name', 2) })
  @IsNotBlank({ message: Msgs.isNotBlank('name') })
  name: string;

  @MaxLength(240, { message: Msgs.maxLength('description', 240) })
  @MinLength(2, { message: Msgs.minLength('description', 2) })
  @Transform(({ value }) => value.toString())
  @IsNotBlank({ message: Msgs.isNotBlank('description') })
  description: string;
}
