import { MinLength } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class UpdatePasswordDto {
  @MinLength(4, { message: Msgs.minLength('password', 4) })
  @IsNotBlank({ message: Msgs.isNotBlank('password') })
  oldPassword: string;

  @MinLength(4, { message: Msgs.minLength('password', 4) })
  @IsNotBlank({ message: Msgs.isNotBlank('password') })
  newPassword: string;
}
