import { TrainingProgram } from 'src/trainingies-programs/entities/trainingies-programs.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'trainingies_folders' })
export class TrainingFolder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => TrainingProgram,
    (trainingProgram) => trainingProgram.trainingFolders,
  )
  trainingPrograms: TrainingProgram[];

  @ManyToOne(() => User, (user) => user.trainingFolders)
  @JoinColumn({ name: 'user_id' })
  users: User[];

  @Column({ select: false, name: 'user_id' })
  userId: string;
}
