import { IsEmail, IsString, MinLength } from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateUserDto {
  @IsString({ message: Msgs.isString('name') })
  @IsNotBlank({ message: Msgs.isNotBlank('name') })
  name: string;

  @IsEmail({}, { message: Msgs.isEmail() })
  @IsNotBlank({ message: Msgs.isNotBlank('email') })
  @MinLength(8, { message: Msgs.minLength('password', 8) })
  email: string;

  @MinLength(4, { message: Msgs.minLength('password', 4) })
  @IsNotBlank({ message: Msgs.isNotBlank('password') })
  password: string;

  @IsNotBlank({ message: Msgs.isNotBlank('password') })
  confirmPassword: string;
}
