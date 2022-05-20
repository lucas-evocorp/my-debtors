import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PredefinedExercice } from './predefined-exercices.entity';
import { Serie } from './series.entity';
import { TrainingHistory } from './training-histories.entity';

@Entity({ name: 'exercices' })
export class Exercice {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(
    () => PredefinedExercice,
    (predefinedExercice) => predefinedExercice.exercices,
  )
  @JoinColumn({ name: 'predefined_exercice_id' })
  predefinedExercice?: PredefinedExercice[];

  @Column({ select: false, nullable: true, name: 'predefined_exercice_id' })
  predefinedExerciceId?: number;

  @ManyToOne(
    () => TrainingHistory,
    (trainingHistories) => trainingHistories.exercices,
  )
  @JoinColumn({ name: 'training_histories_id' })
  trainingHistories?: TrainingHistory[];

  @Column({ select: false, nullable: true, name: 'training_histories_id' })
  trainingHistoriesId?: string;

  @OneToMany(() => Serie, (serie) => serie.exercices)
  series: Serie[];
}
