import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHORIZATION_METADATA } from '../constants/authorization.constants';
import { SCOPE } from '../../domain/enums';

interface AuthenticatedRequest extends Request {
  user?: {
    scope?: string; // space separated scopes from JWT
  };
}

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride<SCOPE[]>(
      AUTHORIZATION_METADATA.SCOPES,
      [context.getHandler(), context.getClass()],
    );

    // If no scopes required → allow access
    if (!requiredScopes || requiredScopes.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();

    const user = request.user;

    if (!user || !user.scope) {
      throw new ForbiddenException('Missing user scope');
    }

    const userScopes = user.scope.split(' ');

    const hasAllRequiredScopes = requiredScopes.every((requiredScope) =>
      userScopes.includes(requiredScope),
    );

    if (!hasAllRequiredScopes) {
      throw new ForbiddenException('Insufficient scope');
    }

    return true;
  }
}
