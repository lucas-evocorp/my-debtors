import { Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { Debtor } from '../entities/debtors.entity';
import { DebtorsRepository } from '../repositories/debtors.repository';

@Injectable()
export class ListUnpaidDebtorsUseCase {
  constructor(private readonly debtorsRepository: DebtorsRepository) {}

  async execute(userAuth: IUserAuth): Promise<Debtor[]> {
    const unpaidDebtors = await this.debtorsRepository.findUnpaidDebtors(
      userAuth,
    );

    return unpaidDebtors;
  }
}
