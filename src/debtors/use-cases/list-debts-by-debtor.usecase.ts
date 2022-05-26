import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { Debt } from '../entities/debts.entity';
import { DebtorsRepository } from '../repositories/debtors.repository';
import { DebtsRepository } from '../repositories/debts.repository';

@Injectable()
export class ListDebtsByDebtorUseCase {
  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtorsRepository: DebtorsRepository,
  ) {}

  async execute(userAuth: IUserAuth, debtorId: string): Promise<Debt[]> {
    const debtor = await this.debtorsRepository.getDebtor(debtorId);

    if (!debtor || debtor.userId !== userAuth.userId) {
      throw new BadRequestException('devedor não encontrado!');
    }

    return this.debtsRepository.findDebtsByDebtor(debtorId);
  }
}
