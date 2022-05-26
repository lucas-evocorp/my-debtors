import { BadRequestException, Injectable } from '@nestjs/common';
import { Debt } from '../entities/debts.entity';
import { DebtorsRepository } from '../repositories/debtors.repository';
import { DebtsRepository } from '../repositories/debts.repository';

@Injectable()
export class GetDebtUseCase {
  constructor(
    private readonly debtorsRepository: DebtorsRepository,
    private readonly debtsRepository: DebtsRepository,
  ) {
    //
  }

  async execute(debtorId: string, debtId: string): Promise<Debt> {
    const debtor = await this.debtorsRepository.getDebtor(debtorId);

    if (!debtor) throw new BadRequestException('Devedor nao encontrado');

    const debt = await this.debtsRepository.getDebt(debtId);

    if (!debt || debt.debtorId !== debtor.id) {
      throw new BadRequestException('divida não encontrada');
    }

    return debt;
  }
}
