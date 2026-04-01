import { AccessTokenPayload, RefreshTokenPayload } from '@/shared/interfaces';

export interface IGenerateTokenUseCase {
  execute(
    accessTokenPlayload: AccessTokenPayload,
    refreshTokenPayload: RefreshTokenPayload,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
