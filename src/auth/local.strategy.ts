/* eslint-disable prettier/prettier */

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const fullUser = await this.authService.validateUser(email, password);

    if (!fullUser) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!fullUser.is_active) {
      throw new HttpException('Usuario desactivado', 423);
    }

    return fullUser;
  }
}
