import { FileLogger } from '@/shared/logger/file-logger';
import { AccessTokenPayload } from '@/shared/interfaces';
import { SucceessResType } from '@/shared/types/success-res.type';
import { IRefreshTokenUseCase, ISignoutUseCase } from '../../ports';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { RefreshTokenPurpose } from '@/modules/auth/domain/enums/refresh-token-purpose.enum';

export class SignoutUseCase implements ISignoutUseCase {
  constructor(
    private readonly _refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly _logger: FileLogger,
  ) {}
  async execute(payload: AccessTokenPayload): Promise<SucceessResType> {
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
