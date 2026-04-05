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
import { REDIS_IMPLE_TOKEN } from '@/shared/infrastructure/cache/token';

@Injectable()
export class ChannelOwnershipGuard implements CanActivate {
  constructor(
    @Inject(CHANNEL_REPO_TOKEN)
    private readonly _channelRepo: IChannelRepo,

    @Inject(REDIS_IMPLE_TOKEN)
    private readonly _chacheRepo: ICacheBaseRepo,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithUserInterface>();
    const userId = request.user?.sub;
    const channelId = request.params.id as string;

    const chacheChannel = await this._chacheRepo.get<{ userId: string }>(
      channelId,
    );

    if (chacheChannel) {
      if (chacheChannel.userId !== userId) {
        throw new ForbiddenException(ERROR_MESSAGES.PERMISSION_DENIED);
      }
    } else {
      const channel = await this._channelRepo.findByChannelId(channelId);
      if (channel?.userId !== userId) {
        throw new ForbiddenException(ERROR_MESSAGES.PERMISSION_DENIED);
      } else {
        await this._chacheRepo.save(
          channel.channelId,
          {
            userId: channel.userId,
          },
          Number(process.env.CHANNEL_CHACHE_TIMEOUT),
        );
      }
    }

    return true;
  }
}
