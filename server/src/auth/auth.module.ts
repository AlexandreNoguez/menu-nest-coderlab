import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersController } from 'src/users/users.controller';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    UsersModule,
  ],
  providers: [
    AuthService,
    UsersService,
    JwtService,
  ],
  controllers: [AuthController, UsersController],
  exports: [AuthService, JwtService]
})
export class AuthModule { }
