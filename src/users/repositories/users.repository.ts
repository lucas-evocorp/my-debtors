import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordDto } from '../dtos/update-password.dto';
import { IUserAuth } from 'src/core/interfaces/user-auth.interface';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      parseInt(process.env.SALT_OR_ROUNDS),
    );

    const user = this.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      admin: false,
    });

    return this.save(user);
  }

  getUserByEmail(email: string): Promise<User> {
    const user = this.findOne({ email });
    return user;
  }

  async updatePassword(
    userAuth: IUserAuth,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UpdateResult> {
    const hashedNewPassword = await bcrypt.hash(
      updatePasswordDto.newPassword,
      parseInt(process.env.SALT_OR_ROUNDS),
    );

    const user = this.create({ password: hashedNewPassword });

    return this.update(userAuth.userId, user);
  }

  getUser(userAuth: IUserAuth): Promise<User> {
    return this.findOne(userAuth.userId);
  }

  deleteUser(userAuth: IUserAuth): Promise<DeleteResult> {
    return this.delete(userAuth.userId);
  }

  findUsers(): Promise<User[]> {
    return this.find();
  }
}
