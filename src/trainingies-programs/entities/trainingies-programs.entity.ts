import { TrainingHistory } from 'src/training-histories/entities/training-histories.entity';
import { TrainingFolder } from 'src/trainingies-folders/entities/trainingies-folders.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'trainingies_programs' })
export class TrainingProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('date', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(
    () => TrainingFolder,
    (trainingfolder) => trainingfolder.trainingPrograms,
  )
  @JoinColumn({ name: 'training_folder_id' })
  trainingFolders: TrainingFolder[];

  @Column({ select: false, nullable: false, name: 'training_folder_id' })
  trainingFolderId: string;

  @OneToMany(
    () => TrainingHistory,
    (trainingHistory) => trainingHistory.TrainingPrograms,
  )
  trainingHistories: TrainingHistory[];
}
