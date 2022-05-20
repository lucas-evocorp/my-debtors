import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateSerieDto {
  @IsString({ message: Msgs.isString('name') })
  @IsNotBlank({ message: Msgs.isNotBlank('name') })
  name: string;

  @IsNumber({}, { message: Msgs.isNumber('weight') })
  @IsNotEmpty({ message: Msgs.isNotBlank('weight') })
  weight: number;

  @IsNumber({}, { message: Msgs.isNumber('repetitions') })
  @IsNotEmpty({ message: Msgs.isNotBlank('repetitions') })
  repetitions: number;

  @IsUUID(null, { message: Msgs.isUUID('exerciceId') })
  @IsNotBlank({ message: Msgs.isNotBlank('exerciceId') })
  exerciceId: string;
}
