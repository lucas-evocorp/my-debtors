import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtorsContoller } from './controllers/debtors.controller';
import { DebtorsRepository } from './repositories/debtors.repository';
import { DebtsRepository } from './repositories/debts.repository';
import { CreateDebtUseCase } from './use-cases/create-debt.usecase';
import { CreateDebtorUseCase } from './use-cases/create-debtor.usecase';
import { GetDebtUseCase } from './use-cases/get-debt.usecase';
import { GetDebtorUseCase } from './use-cases/get-debtor.usecase';
import { ListDebtsByDebtorUseCase } from './use-cases/list-debts-by-debtor.usecase';
import { ListDebtorsUseCase } from './use-cases/list-debtors.usecase';
import { partialPaymentOfDebtUseCase } from './use-cases/partial-payment-of-debt.usecase';
import { ListUnpaidDebtorsUseCase } from './use-cases/list-unpaid-debtors.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([DebtorsRepository, DebtsRepository])],
  exports: [TypeOrmModule],
  controllers: [DebtorsContoller],
  providers: [
    CreateDebtorUseCase,
    ListDebtorsUseCase,
    CreateDebtUseCase,
    ListDebtsByDebtorUseCase,
    partialPaymentOfDebtUseCase,
    GetDebtorUseCase,
    GetDebtUseCase,
    ListUnpaidDebtorsUseCase,
  ],
})
export class DebtorsModule {}
