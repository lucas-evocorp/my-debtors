import { Debtor } from 'src/debtors/entities/debtors.entity';
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

  @OneToMany(() => Debtor, (debtor) => debtor.users)
  debtors: Debtor[];
}
