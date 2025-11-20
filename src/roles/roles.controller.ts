/* eslint-disable prettier/prettier */

import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { RoleEntity } from './role.entity/role.entity';
import { RolesService } from './roles.service';
import { plainToInstance } from 'class-transformer';
import { RoleDto } from './role.dto/role.dto';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}
    
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async createRole(@Body() roleDto: RoleDto): Promise<RoleEntity> {
        const role = plainToInstance(RoleEntity, roleDto);
        return this.rolesService.createRole(role);
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAllRoles(): Promise<RoleEntity[]> {
        return this.rolesService.getAllRoles();
    }

}
