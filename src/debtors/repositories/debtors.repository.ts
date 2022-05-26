import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { CreateDebtDto } from '../dtos/create-debt.dto';
import { CreateDebtorDto } from '../dtos/create-debtor.dto';
import { PartialPaymentDebtDto } from '../dtos/partial-payment-debt.dto';
import { Debtor } from '../entities/debtors.entity';

export interface IuserDebtorsResponse {
  id: string;
  email: string;
  name: string;
  totalDebts: number;
  pendingDebts: number;
}

@EntityRepository(Debtor)
export class DebtorsRepository extends Repository<Debtor> {
  async createDebtor(
    userAuth: IUserAuth,
    createDebtorDto: CreateDebtorDto,
  ): Promise<Debtor> {
    const newDebtor = this.create({
      email: createDebtorDto.email,
      name: createDebtorDto.name,
      userId: userAuth.userId,
    });

    return await this.save(newDebtor);
  }

  async findDebtors(userAuth: IUserAuth): Promise<IuserDebtorsResponse[]> {
    return this.find({
      where: { userId: userAuth.userId },
      select: ['id', 'email', 'name', 'totalDebts', 'pendingDebts'],
    });
  }

  async getDebtor(id: string): Promise<Debtor> {
    return this.findOne(id);
  }

  async updateTotalDebtAmount(
    id: string,
    createDebtDto: CreateDebtDto,
  ): Promise<UpdateResult> {
    const debt = await this.getDebtor(id);

    const newDebtAmount = this.create({
      totalDebts: debt.totalDebts + createDebtDto.totalDebt,
      pendingDebts: debt.pendingDebts + createDebtDto.totalDebt,
    });

    return this.update(id, newDebtAmount);
  }

  async updatePendingDebtAmount(
    partialPaymentDebtDto: PartialPaymentDebtDto,
    debtor: Debtor,
  ): Promise<UpdateResult> {
    const updatePendingDebt = this.create({
      id: debtor.id,
      pendingDebts: debtor.pendingDebts - partialPaymentDebtDto.partialPayment,
    });

    return this.update(debtor.id, updatePendingDebt);
  }

  async getDebtorByEmail(email: string): Promise<Debtor> {
    return this.findOne({ email });
  }

  async findUnpaidDebtors(userAuth: IUserAuth): Promise<Debtor[]> {
    return this.createQueryBuilder('debtors')
      .where('debtors.userId = :userId', { userId: userAuth.userId })
      .andWhere('debtors.pendingDebts != :value', {
        value: 0,
      })
      .getMany();
  }
}
