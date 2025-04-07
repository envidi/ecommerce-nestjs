import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<{ id: string }>(token, {
        secret: this.configService.get<string>('jwtSecret'),
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')?.[1];
  }
}
