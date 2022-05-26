import { IsNotEmpty, IsNumber } from 'class-validator';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class PartialPaymentDebtDto {
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: Msgs.isNumber('partialPayment') },
  )
  @IsNotEmpty({ message: Msgs.isNotBlank('partialPayment') })
  partialPayment: number;
}
