import { BadRequestException, Injectable } from '@nestjs/common';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';
import { CreateDebtorDto } from '../dtos/create-debtor.dto';
import { Debtor } from '../entities/debtors.entity';
import { DebtorsRepository } from '../repositories/debtors.repository';

@Injectable()
export class CreateDebtorUseCase {
  constructor(private readonly debtorsRepository: DebtorsRepository) {}

  async execute(
    userAuth: IUserAuth,
    createDebtorDto: CreateDebtorDto,
  ): Promise<Debtor> {
    const checkEmailExist = await this.debtorsRepository.getDebtorByEmail(
      createDebtorDto.email,
    );

    if (checkEmailExist) {
      throw new BadRequestException('Esse email ja esta sendo usado!');
    }

    return this.debtorsRepository.createDebtor(userAuth, createDebtorDto);
  }
}
