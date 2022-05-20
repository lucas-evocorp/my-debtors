import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PredefinedExercice } from './predefined-exercices.entity';

@Entity({ name: 'muscle' })
export class Muscle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(
    () => PredefinedExercice,
    (predefinedExercice) => predefinedExercice.muscles,
  )
  predefinedExercice?: PredefinedExercice[];
}
