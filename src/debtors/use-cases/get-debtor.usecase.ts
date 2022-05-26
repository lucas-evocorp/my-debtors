import { BadRequestException, Injectable } from '@nestjs/common';
import { Debtor } from '../entities/debtors.entity';
import { DebtorsRepository } from '../repositories/debtors.repository';

@Injectable()
export class GetDebtorUseCase {
  constructor(private readonly debtorRepository: DebtorsRepository) {
    //
  }

  async execute(debtorId: string): Promise<Debtor> {
    const debtor = await this.debtorRepository.getDebtor(debtorId);

    if (!debtor) throw new BadRequestException('devedor não encontrado');

    return debtor;
  }
}
