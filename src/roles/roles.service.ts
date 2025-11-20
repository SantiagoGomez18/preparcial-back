/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ){}

    async createRole(role : RoleEntity): Promise<RoleEntity> {
        return this.roleRepository.save(role);
    }

    async getAllRoles(): Promise<RoleEntity[]> {
        return this.roleRepository.find({ relations: ['users'] });
    }


}  
