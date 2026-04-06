import { ICacheBaseRepo } from '@/shared/application/ports';
import { GetChannelInput } from '../inputs';
import { GetBaseChannelOutPut } from '../output';
import { IChannelRepo, IGetBaseChannelUseCase } from '../ports';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class GetBaseChannelUseCase implements IGetBaseChannelUseCase {
  constructor(
    private readonly _channelRepo: IChannelRepo,
    private readonly _chacheRepo: ICacheBaseRepo,
  ) {}
  async execute(input: GetChannelInput): Promise<GetBaseChannelOutPut> {
    const chachedChannel = await this._chacheRepo.get<GetBaseChannelOutPut>(
      input.channelId,
    );

    let result: GetBaseChannelOutPut;

    if (chachedChannel) {
      result = {
        bio: chachedChannel.bio,
        status: chachedChannel.status,
        userId: chachedChannel.userId,
        isLive: chachedChannel.isLive,
        createdAt: chachedChannel.createdAt,
        channelId: chachedChannel.channelId,
        channelName: chachedChannel.channelName,
        profileImageUrl: chachedChannel.profileImageUrl,
        subscribersCount: chachedChannel.subscribersCount,
        backgroundBannerUrl: chachedChannel.backgroundBannerUrl,
      };
    } else {
      const channel = await this._channelRepo.findByChannelId(input.channelId);
      if (!channel) {
        throw new BadRequestError(ERROR_MESSAGES.CHANNEL_NOT_EXISTS);
      }
      result = {
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
      };
    }

    return result;
  }
}
