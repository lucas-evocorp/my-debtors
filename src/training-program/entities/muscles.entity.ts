import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PredefinedExercice } from './predefined-exercices.entity';

// enum MusclesEnum {
//   PEITO = 'peito',
//   COSTAS = 'costas',
//   OMBRO = 'ombros',
//   TRICEPS = 'triceps',
//   BICEPS = 'biceps',
//   PERNAS = 'pernas',
//   OUTRO = 'outro',
// }

@Entity({ name: 'muscle' })
export class Muscle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(
    () => PredefinedExercice,
    (predefinedExercice) => predefinedExercice.muscle,
  )
  predefinedExercice?: PredefinedExercice[];
}
