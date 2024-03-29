import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OwnerIdGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ownerIdCheck = this.reflector.getAllAndOverride<boolean>('ownerId', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!ownerIdCheck) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    const owner = request.query;

    if (
      request.user.isAdmin ||
      request.user.email === owner.email ||
      request.user.id === owner.id
    ) {
      return true;
    }
    return false;
  }
}
