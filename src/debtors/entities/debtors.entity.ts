import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Debt } from './debts.entity';

@Entity({ name: 'debtors' })
export class Debtor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: 0, name: 'total_debts' })
  totalDebts: number;

  @Column({ default: 0, name: 'pending_debts' })
  pendingDebts: number;

  @ManyToOne(() => User, (users) => users.debtors)
  @JoinColumn({ name: 'user_id' })
  users?: User[];

  @OneToMany(() => Debt, (debt) => debt.debtor)
  debt?: Debt[];

  @Column({ name: 'user_id' })
  userId: string;
}
