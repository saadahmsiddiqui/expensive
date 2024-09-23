import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const resp = await this.authService.validateAccessToken(authToken);
      request.auth = resp;
      return true;
    } catch (error) {
      throw new HttpException('Invalid or missing access token.', 401);
    }
  }
}
