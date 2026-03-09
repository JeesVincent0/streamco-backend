import { UserRole } from '@/modules/user/domain';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { UniqueIdService } from '@/shared/domain';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from '../../../../shared/interfaces/token-type';

export class TokenPayload {
  private static getJwtConfig() {
    const { JWT_ISSUER, JWT_AUDIENCE } = process.env;

    if (!JWT_ISSUER || !JWT_AUDIENCE) {
      throw new Error(ERROR_MESSAGES.ENV_FILE_NOT_ATTACHED);
    }

    return {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    };
  }

  static generateAccessPayload(
    id: string,
    role: UserRole,
    scope: string,
  ): AccessTokenPayload {
    const { issuer, audience } = this.getJwtConfig();

    return {
      sub: id,
      iss: issuer,
      aud: audience,
      jti: UniqueIdService.generate(),
      iat: Math.floor(Date.now() / 1000),
      scope,
      role,
    };
  }

  static generateRefreshPayload(
    id: string,
    role: UserRole,
  ): RefreshTokenPayload {
    const { issuer, audience } = this.getJwtConfig();

    return {
      sub: id,
      iss: issuer,
      aud: audience,
      jti: UniqueIdService.generate(),
      iat: Math.floor(Date.now() / 1000),
      role,
    };
  }
}
