import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercice } from './exercices.entity';

@Entity({ name: 'series' })
export class Serie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  repetitions: number;

  @ManyToOne(() => Exercice, (exercice) => exercice.series)
  @JoinColumn({ name: 'exercice_id' })
  exercices: Exercice[];

  @Column({ name: 'exercice_id' })
  exerciceId: string;
}
