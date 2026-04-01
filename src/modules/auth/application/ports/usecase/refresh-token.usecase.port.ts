import { RefreshTokenPurpose } from '@/modules/auth/domain/enums/refresh-token-purpose.enum';

export interface IRefreshTokenUseCase {
  execute(token: string, purpose: RefreshTokenPurpose);
}
