import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { BadRequestError } from '@/shared/errors';
import type { ILogger } from '@/shared/logger/logger.interface';
import type { IUserCheck } from '@/shared/application/ports';
import { RequestWithUserInterface } from '@/shared/interfaces';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { USER_CHECK_TOKEN } from '@/modules/user/infrastructure/infra.tokens';
import { LOGGER_TOKEN } from '@/shared/logger';

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

    const isUserActive = await this._userCheck.isUserActive(userId);

    if (!isUserActive) {
      this._logger.error({
        event: LOG_EVENTS.USER_NOT_ACTIVE,
        context: 'ActiveUserGuard',
        userId,
      });
      throw new BadRequestError(ERROR_MESSAGES.ACCESS_DENIED);
    }

    return true;
  }
}
