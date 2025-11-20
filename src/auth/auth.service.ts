/* eslint-disable prettier/prettier */

import { ConflictException, Injectable, BadRequestException, UnauthorizedException, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from 'src/users/register.dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Valida credenciales y retorna el usuario COMPLETO.
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (!user.is_active) {
      throw new HttpException('Usuario desactivado', 423);
    }

    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const fullUser = await this.usersService.getMyUser(user.id);
    return fullUser;
  }

  /**
   * Login: genera JWT con datos completos
   */
  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((r) => r.role_name),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registro
   */
  async register(dto: RegisterDto) {
    if (!dto.email || !dto.email.includes('@')) {
      throw new BadRequestException('Email inválido');
    }

    const exists = await this.usersService.findByEmail(dto.email);
    if (exists) throw new ConflictException('Email ya registrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    return {
      message: 'Usuario registrado con éxito',
      userId: user.id,
    };
  }
}
