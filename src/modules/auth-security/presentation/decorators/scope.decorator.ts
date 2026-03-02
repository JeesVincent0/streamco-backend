import { SetMetadata } from '@nestjs/common';
import { AUTHORIZATION_METADATA } from '../constants/authorization.constants';
import { SCOPE } from '../../domain/enums';

/**
 * Scopes Decorator
 *
 * Defines required scopes for a route or controller.
 *
 * Example:
 * @Scopes('USER:read')
 */
export const Scopes = (...scopes: SCOPE[]) =>
  SetMetadata(AUTHORIZATION_METADATA.SCOPES, scopes);
