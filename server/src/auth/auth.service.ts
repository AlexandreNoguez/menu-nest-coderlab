import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { hash, compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXPIRE_TIME } from 'src/constants/expire-time';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/enums/roles';


@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new User();
      const hashedPassword = await hash(createUserDto.password, 10);

      user.name = createUserDto.name;
      user.email = createUserDto.email;
      user.password = hashedPassword;
      user.role = UserRole.USER;

      await this.usersRepository.save(user);

      return User.userWithoutPassword(user);

    } catch (error) {
      throw new HttpException("E-mail already registerd", HttpStatus.CONFLICT);
    }
  }

  @HttpCode(200)
  async login(signInDto: SignInDto): Promise<{
    user: User,
    token: {
      accessToken: string,
      refreshToken: string
      expiresIn: number
    }
  }> {
    try {

      const user = await this.validateUser(signInDto);
      const payload = {
        email: user.email,
        sub: {
          name: user.name,
        },
      };

      return {
        user,
        token: {
          accessToken: await this.jwtService.signAsync(payload, {
            expiresIn: '8h',
            secret: process.env.API_JWT_SECRET,
          }),
          refreshToken: await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
            secret: process.env.API_JWT_REFRESH,
          }),
          expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(signInDto: SignInDto): Promise<any> {
    const findUser = await this.usersService.findByEmail(signInDto.email);

    if (!findUser) {
      throw new HttpException('E-mail or Password is incorrect.', HttpStatus.NOT_FOUND);
    }

    const matchPassword = await compare(signInDto.password, findUser.password);

    if (!matchPassword) {
      throw new HttpException('E-mail or Password is incorrect.', HttpStatus.UNAUTHORIZED);
    }

    if (findUser != null) {
      return findUser.result;
    }

    throw new UnauthorizedException();
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.jwtSecretKey,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.jwtRefreshTokenKey,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
