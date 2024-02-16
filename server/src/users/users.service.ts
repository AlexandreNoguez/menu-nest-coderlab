import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      const hash = await bcrypt.hash(createUserDto.password, 10);

      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = hash;
      user.role = createUserDto.role;

      await this.usersRepository.save(user);

      return User.userWithoutPassword(user);

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {

    const user = await this.usersRepository.findOne({
      where: {
        email,
      }
    })

    if (user) {
      const { password, ...result } = user;

      return { password, result }

    }

    throw new NotFoundException("User not found")
  }
}
