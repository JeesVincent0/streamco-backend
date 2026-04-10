import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { AppForbiddenException } from '@/shared/errors';
import type { ILogger } from '@/shared/logger/logger.interface';
import type { IUserCheck } from '@/shared/application/ports';
import { RequestWithUserInterface } from '@/shared/interfaces';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { USER_CHECK_TOKEN } from '@/modules/user/infrastructure/infra.tokens';
import { LOGGER_TOKEN } from '@/shared/logger';
import { ErrorCode } from '../enums';
import { UserStatus } from '@/modules/user/domain';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(
    @Inject(USER_CHECK_TOKEN)
    private readonly _userCheck: IUserCheck,

    @Inject(LOGGER_TOKEN)
    private readonly _logger: ILogger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithUserInterface>();

    const userId = request.user.sub;

    const userStatus = await this._userCheck.isUserActive(userId);

    if (!userStatus || userStatus === UserStatus.DELETED) {
      this._logger.error({
        event: LOG_EVENTS.USER_NOT_ACTIVE,
        context: 'ActiveUserGuard',
        userId,
      });

      throw new AppForbiddenException(
        ErrorCode.USER_NOT_EXISTS,
        ERROR_MESSAGES.USER_NOT_EXISTS,
      );
    } else if (userStatus === UserStatus.SUSPENDED) {
      this._logger.error({
        event: LOG_EVENTS.USER_NOT_ACTIVE,
        context: 'ActiveUserGuard',
        userId,
      });

      throw new AppForbiddenException(
        ErrorCode.USER_SUSPENDED,
        ERROR_MESSAGES.USER_SUSPENDED,
      );
    }

    return true;
  }
}
