import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { CHANNEL_STATUS } from '../../domain/enums';
import { AppForbiddenException, BadRequestError } from '@/shared/errors';
import { ErrorCode } from '@/shared/infrastructure/enums';
import { type IChannelRepo } from '../../application/ports';
import { CHANNEL_REPO_TOKEN } from '../../application/token';
import { RequestWithUserInterface } from '@/shared/interfaces';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

@Injectable()
export class IsChannelActiveGuard implements CanActivate {
  constructor(
    @Inject(CHANNEL_REPO_TOKEN)
    private readonly _channelRepo: IChannelRepo,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithUserInterface>();

    const channelId = request.params.id as string;

    const channel = await this._channelRepo.findByChannelId(channelId);

    if (!channel) {
      throw new BadRequestError(ERROR_MESSAGES.USE_ANOTHER_CHANNEL_ID);
    }

    if (channel?.status !== CHANNEL_STATUS.ACTIVE) {
      throw new AppForbiddenException(
        ErrorCode.CHANNEL_BLOCKED,
        ERROR_MESSAGES.CHANNEL_BLOCKED,
      );
    }

    return true;
  }
}
