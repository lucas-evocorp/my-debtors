import { Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import {
  DebtorsRepository,
  IuserDebtorsResponse,
} from '../repositories/debtors.repository';

@Injectable()
export class ListDebtorsUseCase {
  constructor(private readonly debtorsRepository: DebtorsRepository) {}

  async execute(userAuth: IUserAuth): Promise<IuserDebtorsResponse[]> {
    return await this.debtorsRepository.findDebtors(userAuth);
  }
}
