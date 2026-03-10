import { RefreshTokenPurpose } from '@/modules/auth/domain/enums/refresh-token-purpose.enum';
import { RefreshTokenUseCase } from '../token';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { AccessTokenPayload } from '@/shared/interfaces';

export class SignoutUseCase {
  constructor(
    private readonly _refreshTokenUseCase: RefreshTokenUseCase,
    private readonly _logger: FileLogger,
  ) {}
  async execute(payload: AccessTokenPayload) {
    await this._refreshTokenUseCase.execute(
      payload.sub,
      RefreshTokenPurpose.REVOKE,
    );

    this._logger.log({
      event: LOG_EVENTS.USER_LOGOUT,
      context: 'SignoutUseCase',
      userId: payload.sub,
    });

    return {
      status: 'success',
      message: 'Successfully logout',
    };
  }
}
