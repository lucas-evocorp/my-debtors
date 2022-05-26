import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CreateMeUserAccountUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('user.created', { async: true })
  async sendEmailSucess(email: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'clementine.walker99@ethereal.email',
        pass: 'cvFfXmrHU7FCHSFbgF',
      },
    });

    const message = {
      from: 'contato@mydebtors.com.br',
      to: `${email}`,
      subject: 'Muito obrigado por se cadastrar no My-debtors',
      text: 'somos um sistema de gerenciamento de devedores, assim você pode ter controle e saber quantas pessoas estão te devendo, o que estão devendo, e quanto estão devendo!',
      html: '<p>Esse é um email automatico, por favor não responder</p>',
    };

    const info = await transporter.sendMail(message);

    console.log('email send', info.messageId);
    return {
      data: { info: info.messageId },
      message: 'email enviado com sucesso!',
    };
  }

  async execute(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.getUserByEmail(createUserDto.email);

    const checkEmailExist = await this.usersRepository.getUserByEmail(
      createUserDto.email,
    );

    // console.log(checkEmailExist);

    if (checkEmailExist) {
      throw new BadRequestException('Esse email ja esta em uso!');
    }

    if (user) {
      throw new BadRequestException('Esse email já esta sendo usado!');
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('As senhas Não Correspondem');
    }

    const saveUser = await this.usersRepository.createUser(createUserDto);

    await this.eventEmitter.emitAsync('user.created', createUserDto.email);

    return saveUser;
  }
}
