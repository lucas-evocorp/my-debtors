import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { CreateDebtDto } from '../dtos/create-debt.dto';
import { Debt } from '../entities/debts.entity';
import { DebtorsRepository } from '../repositories/debtors.repository';
import { DebtsRepository } from '../repositories/debts.repository';

@Injectable()
export class CreateDebtUseCase {
  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtorsRepository: DebtorsRepository,
  ) {}

  async execute(
    userAuth: IUserAuth,
    debtorId: string,
    createDebtDto: CreateDebtDto,
  ): Promise<Debt> {
    const debtor = await this.debtorsRepository.getDebtor(debtorId);

    if (!debtor || debtor.userId !== userAuth.userId) {
      throw new BadRequestException('devedor não encontrado!');
    }

    await this.debtorsRepository.updateTotalDebtAmount(
      debtor.id,
      createDebtDto,
    );

    return await this.debtsRepository.createDebt(debtor.id, createDebtDto);
  }
}
