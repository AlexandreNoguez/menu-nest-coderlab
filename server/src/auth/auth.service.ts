import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EXPIRE_TIME } from 'src/constants/expire-time';


@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }

  async login(signInDto: SignInDto): Promise<{
    user: User,
    token: {
      accessToken: string,
      refreshToken: string
      expiresIn: number
    }
  }> {
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
  }

  async validateUser(signInDto: SignInDto): Promise<any> {
    const findUser = await this.usersService.findByEmail(signInDto.email);

    if (findUser != null) {
      return findUser
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
