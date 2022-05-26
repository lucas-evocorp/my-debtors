import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Debtor } from './debtors.entity';

@Entity({ name: 'debts' })
export class Debt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date', default: new Date(), name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'date', default: new Date(), name: 'reminder_at' })
  reminderAt: Date;

  @Column({ name: 'total_debt' })
  totalDebt: number;

  @Column({ name: 'pending_debt' })
  pendingDebt: number;

  @ManyToOne(() => Debtor, (debtor) => debtor.debt)
  @JoinColumn({ name: 'debtor_id' })
  debtor?: Debtor;

  @Column({ name: 'debtor_id' })
  debtorId: string;
}
