import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { PartialPaymentDebtDto } from '../dtos/partial-payment-debt.dto';
import { Debtor } from '../entities/debtors.entity';
import { Debt } from '../entities/debts.entity';
import { DebtorsRepository } from '../repositories/debtors.repository';
import { DebtsRepository } from '../repositories/debts.repository';

@Injectable()
export class partialPaymentOfDebtUseCase {
  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtorsRepository: DebtorsRepository,
  ) {
    //
  }

  async handleData(
    debt: Debt,
    debtor: Debtor,
    partialPaymentDebtDto: PartialPaymentDebtDto,
  ): Promise<void> {
    if (!debtor) {
      throw new BadRequestException('devedor não encontrado');
    }

    if (!debt || debt.debtorId !== debtor.id) {
      throw new BadRequestException('Ops... Divida não encontrada!');
    }

    if (partialPaymentDebtDto.partialPayment > debt.pendingDebt) {
      throw new BadRequestException('você não pode pagar mais do que deve!');
    }
  }

  async execute(
    debtId: string,
    debtorId: string,
    partialPaymentDebtDto: PartialPaymentDebtDto,
  ): Promise<UpdateResult> {
    const debt = await this.debtsRepository.getDebt(debtId);
    const debtor = await this.debtorsRepository.getDebtor(debtorId);

    await this.handleData(debt, debtor, partialPaymentDebtDto);

    const partialPaymentDebt = await this.debtsRepository.partialPaymentOfDebt(
      debt,
      partialPaymentDebtDto,
    );

    if (partialPaymentDebt.affected !== 0) {
      return await this.debtorsRepository.updatePendingDebtAmount(
        partialPaymentDebtDto,
        debtor,
      );
    }

    return partialPaymentDebt;
  }
}
