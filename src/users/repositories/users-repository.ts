import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';

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
    });

    return this.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({ email });
    return user;
  }
}
