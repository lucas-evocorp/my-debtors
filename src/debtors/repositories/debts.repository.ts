import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateDebtDto } from '../dtos/create-debt.dto';
import * as dayjs from 'dayjs';
import { Debt } from '../entities/debts.entity';
import { PartialPaymentDebtDto } from '../dtos/partial-payment-debt.dto';

@EntityRepository(Debt)
export class DebtsRepository extends Repository<Debt> {
  createDebt(debtorId: string, createDebtsDto: CreateDebtDto): Promise<Debt> {
    const newDebt = this.create({
      debtorId: debtorId,
      name: createDebtsDto.name,
      totalDebt: createDebtsDto.totalDebt,
      pendingDebt: createDebtsDto.totalDebt,
      createdAt: dayjs(createDebtsDto.createdAt).format('YYYY/MM/DD'),
      reminderAt: dayjs(createDebtsDto.reminderAt).format('YYYY/MM/DD'),
    });

    return this.save(newDebt);
  }

  findDebtsByDebtor(debtorId: string): Promise<Debt[]> {
    return this.find({
      where: { debtorId },
      select: [
        'id',
        'name',
        'createdAt',
        'reminderAt',
        'totalDebt',
        'pendingDebt',
      ],
    });
  }

  async partialPaymentOfDebt(
    debt: Debt,
    partialPaymentDebtDto: PartialPaymentDebtDto,
  ): Promise<UpdateResult> {
    const payPartialdebt = this.create({
      id: debt.id,
      pendingDebt: debt.pendingDebt - partialPaymentDebtDto.partialPayment,
    });

    return this.update(debt.id, payPartialdebt);
  }

  async getDebt(id: string): Promise<Debt> {
    return this.findOne(id);
  }
}
