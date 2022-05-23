import { TrainingFolder } from 'src/trainingies-folders/entities/trainingies-folders.entity';
import { TrainingProgram } from 'src/trainingies-programs/entities/trainingies-programs.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column()
  admin: boolean;

  @OneToMany(() => TrainingFolder, (trainingFolder) => trainingFolder.users)
  trainingFolders: TrainingFolder[];
}
