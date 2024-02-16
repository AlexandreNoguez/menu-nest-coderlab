import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const decodedToken = this.verifyToken(token);

    if (!decodedToken) {
      throw new UnauthorizedException();
    }

    request.user = decodedToken;

    if (request.user.role != 'admin') {
      throw new UnauthorizedException();
    }

    return true;
  }

  private verifyToken(token: string): string {
    try {
      const decoded = this.jwtService.decode(token);

      return decoded;
    } catch (error) {
      return null
    }
  }
}


