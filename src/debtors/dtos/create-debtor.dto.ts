import { IsEmail, IsString } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateDebtorDto {
  @IsString({ message: 'name' })
  @IsNotBlank({ message: Msgs.isNotBlank('name') })
  name: string;

  @IsEmail({}, { message: Msgs.isEmail() })
  @IsString({ message: Msgs.isString('email') })
  @IsNotBlank({ message: Msgs.isNotBlank('email') })
  email: string;
}
