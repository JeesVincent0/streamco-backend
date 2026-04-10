import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CHANNEL_REPO_TOKEN } from '../../application/token';
import type { IChannelRepo } from '../../application/ports';
import type { ICacheBaseRepo } from '@/shared/application/ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { RequestWithUserInterface } from '@/shared/interfaces';
import { CHACHE_REPO_TOKEN } from '@/shared/infrastructure/cache/token';
import { BadRequestError } from '@/shared/errors';

@Injectable()
export class ChannelOwnershipGuard implements CanActivate {
  constructor(
    @Inject(CHANNEL_REPO_TOKEN)
    private readonly _channelRepo: IChannelRepo,

    @Inject(CHACHE_REPO_TOKEN)
    private readonly _chacheRepo: ICacheBaseRepo,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithUserInterface>();
    const userId = request.user?.sub;
    const channelId = request.params.id as string;

    const channel = await this._channelRepo.findByChannelId(channelId);

    if (!channel)
      throw new BadRequestError(ERROR_MESSAGES.USE_ANOTHER_CHANNEL_ID);

    if (channel?.userId !== userId)
      throw new ForbiddenException(ERROR_MESSAGES.PERMISSION_DENIED);

    return true;
  }
}
