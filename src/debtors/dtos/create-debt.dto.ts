import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { IsNotBlank } from 'src/core/decorators/is-not-blank';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateDebtDto {
  @IsString()
  @IsNotBlank({ message: Msgs.isNotBlank('name') })
  name: string;

  @IsDateString({ message: Msgs.isDate('createdAt') })
  @IsOptional()
  createdAt?: Date;

  @IsPositive({ message: Msgs.isPositive('totalDebt') })
  @IsNumber({}, { message: Msgs.isNumber('totalDebt') })
  @IsNotEmpty({ message: Msgs.isNotBlank('totalDebt') })
  totalDebt: number;

  @IsDateString({ message: Msgs.isDate('createdAt') })
  @IsOptional()
  reminderAt: Date;
}
