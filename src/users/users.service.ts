/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
import { RoleEntity } from 'src/roles/role.entity/role.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ){}

    async getAllUsers(): Promise<any> {
        const users = await this.userRepository.find({ relations: ['roles'] });
        return users.map(u => instanceToPlain(u));
    }

    async getMyUser(id: string): Promise<any> {
        const user : UserEntity | null = await this.userRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        console.log('Retrieved user:', user);
        return instanceToPlain(user);
    }

    async findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email }, relations: ['roles'] });
    }
    async create(data: Partial<UserEntity>): Promise<UserEntity> {
        const newUser = this.userRepository.create(data);
        return this.userRepository.save(newUser);
    }

  async asignar(userId: string, roles: string[]) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const roleEntities = await this.roleRepository.find({
      where: { role_name: In(roles) },
    });

    if (roleEntities.length !== roles.length) {
      throw new BadRequestException('roles inválidos');
    }

    user.roles = roleEntities;

    await this.userRepository.save(user);

    return { message: 'Roles asignados' };
  }
        
}
