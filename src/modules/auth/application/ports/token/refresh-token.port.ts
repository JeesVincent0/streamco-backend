import { RefreshToken } from '@/modules/auth/domain/entity';

export interface RefreshTokenPort {
  save(refreshToken: RefreshToken): Promise<void>;
  findByJti(jti: string): Promise<RefreshToken | null>;
  revokeToken(userId: string): Promise<void>;
  revokeAllTokenByUserId(userId: string): Promise<void>;
}
