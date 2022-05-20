import { TrainingProgram } from 'src/trainingies-programs/entities/trainingies-programs.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercice } from './exercices.entity';

@Entity({ name: 'training-histories' })
export class TrainingHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('date', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => TrainingProgram, (trainingProgram) => trainingProgram)
  @JoinColumn({ name: 'training_program_id' })
  TrainingPrograms: TrainingProgram[];

  @Column({ select: false, name: 'training_program_id' })
  trainingProgramId: number;

  @OneToMany(() => Exercice, (exercice) => exercice.trainingHistories)
  exercices?: Exercice[];
}
