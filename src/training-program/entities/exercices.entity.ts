import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PredefinedExercice } from './predefined-exercices.entity';
import { Training } from './trainings.entity';

@Entity({ name: 'exercices' })
export class Exercice {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  series: number;

  @Column()
  weight: number;

  @ManyToOne(
    () => PredefinedExercice,
    (predefinedExercice) => predefinedExercice.exercice,
  )
  @JoinColumn({ name: 'predefined_exercice_id' })
  predefinedExercice?: PredefinedExercice[];

  @Column({ nullable: true, name: 'predefined_exercice_id' })
  predefinedExerciceId?: number;

  @ManyToOne(() => Training, (training) => training.exercice)
  @JoinColumn({ name: 'training_program_id' })
  training?: Training[];

  @Column({ nullable: true, name: 'training_program_id' })
  trainingProgramId?: number;
}
