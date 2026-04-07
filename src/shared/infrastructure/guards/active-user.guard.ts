import {
  Inject,
  Injectable,
  ExecutionContext,
  CanActivate,
} from '@nestjs/common';

import type { IUserCheck } from '@/shared/application/ports';
import { RequestWithUserInterface } from '@/shared/interfaces';
import { USER_CHECK_TOKEN } from '@/modules/user/infrastructure/infra.tokens';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(
    @Inject(USER_CHECK_TOKEN)
    private readonly _userCheck: IUserCheck,

    private readonly _logger: FileLogger,
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
