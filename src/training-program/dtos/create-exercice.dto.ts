import { IsNotEmpty, IsNumber, NotEquals } from 'class-validator';
import { messagesValidation as Msgs } from 'src/core/messages/messages-validation-response';

export class CreateExerciceDto {
  @IsNumber({}, { message: Msgs.isNumber('trainingId') })
  @IsNotEmpty({ message: Msgs.isNotBlank('trainingId') })
  trainingId: number;

  @IsNumber({}, { message: Msgs.isNumber('predefinedExercicesId') })
  @IsNotEmpty({ message: Msgs.isNotBlank('predefinedExercicesId') })
  predefinedExerciceId: number;

  @NotEquals(0, { message: 'Você precisa selecionar um numero de series!' })
  @IsNumber({}, { message: Msgs.isNumber('series') })
  @IsNotEmpty({ message: Msgs.isNotBlank('series') })
  series: number;

  @NotEquals(0, {
    message: 'Você precisa selecionar uma carga para o seu exercicio!',
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: Msgs.isNumber('weight') })
  @IsNotEmpty({ message: Msgs.isNotBlank('weight') })
  weight: number;
}
