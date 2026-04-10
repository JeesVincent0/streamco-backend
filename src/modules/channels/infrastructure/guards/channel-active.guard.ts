import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

import { CHANNEL_STATUS } from '../../domain/enums';
import { AppForbiddenException } from '@/shared/errors';
import { ErrorCode } from '@/shared/infrastructure/enums';
import { type IChannelRepo } from '../../application/ports';
import { CHANNEL_REPO_TOKEN } from '../../application/token';
import { RequestWithUserInterface } from '@/shared/interfaces';
import { type ICacheBaseRepo } from '@/shared/application/ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { CHACHE_REPO_TOKEN } from '@/shared/infrastructure/cache/token';

@Injectable()
export class IsChannelActiveGuard implements CanActivate {
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

    const channelId = request.params.id as string;

    const chacheChannel = await this._chacheRepo.get<{
      status: CHANNEL_STATUS;
    }>(channelId);

    if (chacheChannel) {
      if (chacheChannel.status !== CHANNEL_STATUS.ACTIVE) {
        throw new AppForbiddenException(
          ErrorCode.CHANNEL_BLOCKED,
          ERROR_MESSAGES.CHANNEL_BLOCKED,
        );
      }
    } else {
      const channel = await this._channelRepo.findByChannelId(channelId);
      if (channel?.status !== CHANNEL_STATUS.ACTIVE) {
        throw new AppForbiddenException(
          ErrorCode.CHANNEL_BLOCKED,
          ERROR_MESSAGES.CHANNEL_BLOCKED,
        );
      } else {
        await this._chacheRepo.save(
          channel.channelId,
          {
            bio: channel.bio,
            status: channel.status,
            userId: channel.userId,
            isLive: channel.isLive,
            createdAt: channel.createdAt,
            channelId: channel.channelId,
            channelName: channel.channelName,
            profileImageUrl: channel.profileImageUrl,
            subscribersCount: channel.subscribersCount,
            backgroundBannerUrl: channel.backgroundBannerUrl,
          },
          Number(process.env.CHANNEL_CHACHE_TIMEOUT),
        );
      }
    }
    return true;
  }
}
