import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from '../dto/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = GqlExecutionContext.create(context).getContext().req;

    if(!user) {
      throw new ForbiddenException('You are not authorized to access this service. Please log in');
    }

    const hasRole = requiredRoles.some((Role) => user.role?.includes(Role));
    if(!hasRole) {
      throw new ForbiddenException('You do not have the required permissions to access this resource.')
    }
    console.log('User roles:', requiredRoles);

    return true;
  }
}