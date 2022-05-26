import { Injectable } from '@nestjs/common';
import { DebtsRepository } from '../repositories/debts.repository';

@Injectable()
export class UpdateDebtUseCase {
  constructor(private readonly debtsRepository: DebtsRepository) {
    //
  }

  async execute(debtId: string) {
    // return
  }
}
