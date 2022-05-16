import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercice } from './exercices.entity';
import { PredefinedExercice } from './predefined-exercices.entity';

@Entity({ name: 'trainings' })
export class Training {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('date', { name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Exercice, (exercice) => exercice.training)
  exercice?: Exercice[];

  @ManyToOne(() => User, (user) => user.training)
  @JoinColumn({ name: 'user_id' })
  user: User[];

  @Column({ name: 'user_id' })
  userId: string;
}
