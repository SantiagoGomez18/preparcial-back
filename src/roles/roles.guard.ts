/* eslint-disable prettier/prettier */

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    
    if (!requiredRoles?.length) return true;

    const user = context.switchToHttp().getRequest().user;


    console.log('User roles:', user?.roles);
    if (!user || !user.roles) return false;

    const userRoles = user.roles.map(r => r.role_name);
    console.log(requiredRoles.some(role => userRoles.includes(role)))
    return requiredRoles.some(role => userRoles.includes(role));
  }
  
}



