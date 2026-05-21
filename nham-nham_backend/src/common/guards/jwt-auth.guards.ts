import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest();

      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
          throw new UnauthorizedException('Token Is Required');
      } else {
          const user = this.jwtService.verify(token, this.configService.get("JWT_SECRET"));
          
          request.user = user;
          return true;
      }
  }
}
