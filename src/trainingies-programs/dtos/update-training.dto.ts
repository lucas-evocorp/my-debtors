import { PartialType } from '@nestjs/swagger';
import { CreateTrainingProgramDto } from './create-training-program.dto';

export class UpdateTrainingDto extends PartialType(CreateTrainingProgramDto) {}
