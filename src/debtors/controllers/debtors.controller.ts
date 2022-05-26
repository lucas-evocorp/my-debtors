import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/core/decorators/user-auth';
import { IResponseApiData } from 'src/core/interfaces/response-api-data';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { responseApiData } from 'src/core/messages/response-api-data-message';
import { CreateDebtDto } from '../dtos/create-debt.dto';
import { CreateDebtorDto } from '../dtos/create-debtor.dto';
import { PartialPaymentDebtDto } from '../dtos/partial-payment-debt.dto';
import { CreateDebtUseCase } from '../use-cases/create-debt.usecase';
import { CreateDebtorUseCase } from '../use-cases/create-debtor.usecase';
import { GetDebtUseCase } from '../use-cases/get-debt.usecase';
import { GetDebtorUseCase } from '../use-cases/get-debtor.usecase';
import { ListDebtsByDebtorUseCase } from '../use-cases/list-debts-by-debtor.usecase';
import { ListDebtorsUseCase } from '../use-cases/list-debtors.usecase';
import { partialPaymentOfDebtUseCase } from '../use-cases/partial-payment-of-debt.usecase';
import { ListUnpaidDebtorsUseCase } from '../use-cases/list-unpaid-debtors.usecase';

@UseGuards(AuthGuard('jwt'))
@Controller('debtors')
@ApiTags('debtors')
export class DebtorsContoller {
  constructor(
    private readonly createDebtorUseCase: CreateDebtorUseCase,
    private readonly listDebtorsUseCase: ListDebtorsUseCase,
    private readonly createDebtUseCase: CreateDebtUseCase,
    private readonly listDebtsByDebtorUseCase: ListDebtsByDebtorUseCase,
    private readonly partialpaymentDebtUseCase: partialPaymentOfDebtUseCase,
    private readonly getDebtorUseCase: GetDebtorUseCase,
    private readonly getDebtUseCase: GetDebtUseCase,
    private readonly listUnpaidDebtorsUseCase: ListUnpaidDebtorsUseCase,
  ) {}

  @Post()
  async createDebtor(
    @UserAuth() userAuth: IUserAuth,
    @Body() createDebtorDto: CreateDebtorDto,
  ): Promise<IResponseApiData> {
    const createDebtor = await this.createDebtorUseCase.execute(
      userAuth,
      createDebtorDto,
    );

    return responseApiData(createDebtor, 'debtor criado com sucesso!');
  }

  @Post(':debtorId/debts')
  async createDebt(
    @Param('debtorId') debtorId: string,
    @UserAuth() userAuth: IUserAuth,
    @Body() createdebtDto: CreateDebtDto,
  ): Promise<IResponseApiData> {
    const newDebt = await this.createDebtUseCase.execute(
      userAuth,
      debtorId,
      createdebtDto,
    );

    return responseApiData(newDebt);
  }

  @Get()
  async listDebtors(
    @UserAuth() userAuth: IUserAuth,
  ): Promise<IResponseApiData> {
    const userDebtors = await this.listDebtorsUseCase.execute(userAuth);

    return responseApiData(userDebtors);
  }

  @Get(':debtorId/debts')
  async listDebt(
    @UserAuth() userAuth: IUserAuth,
    @Param('debtorId') debtorId: string,
  ): Promise<IResponseApiData> {
    const debts = await this.listDebtsByDebtorUseCase.execute(
      userAuth,
      debtorId,
    );

    return responseApiData(debts);
  }

  @Put(':debtorId/debts/:debtId/partial-payment')
  async partialPaymentDebt(
    @Param('debtorId') debtorId: string,
    @Param('debtId') debtId: string,
    @Body() partialPaymentDebtDto: PartialPaymentDebtDto,
  ): Promise<IResponseApiData> {
    const partialPayment = await this.partialpaymentDebtUseCase.execute(
      debtId,
      debtorId,
      partialPaymentDebtDto,
    );

    return responseApiData(partialPayment);
  }

  @Get(':debtorId')
  async getDebtor(
    @Param('debtorId') debtorId: string,
  ): Promise<IResponseApiData> {
    const debtor = await this.getDebtorUseCase.execute(debtorId);

    return responseApiData(debtor);
  }

  @Get(':debtorId/debts/:debtId')
  async getDebt(
    @Param('debtorId') debtorId: string,
    @Param('debtId') debtId: string,
  ): Promise<IResponseApiData> {
    const debt = await this.getDebtUseCase.execute(debtorId, debtId);

    return responseApiData(debt);
  }

  @Get(':debtorId/unpaid-debtors')
  async listUnpaidDebtors(
    @UserAuth() userAuth: IUserAuth,
  ): Promise<IResponseApiData> {
    const unpaidDebtors = await this.listUnpaidDebtorsUseCase.execute(userAuth);

    return responseApiData(unpaidDebtors);
  }
}
