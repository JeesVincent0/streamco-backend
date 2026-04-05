import { ICacheBaseRepo } from '@/shared/application/ports';
import { GetBaseChannelInput } from '../inputs';
import { GetBaseChannelOutPut } from '../output';
import { IChannelRepo, IGetBaseChannelUseCase } from '../ports';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class GetBaseChannelUseCase implements IGetBaseChannelUseCase {
  constructor(
    private readonly _channelRepo: IChannelRepo,
    private readonly _chacheRepo: ICacheBaseRepo,
  ) {}
  async execute(input: GetBaseChannelInput): Promise<GetBaseChannelOutPut> {
    const chachedChannel = await this._chacheRepo.get<GetBaseChannelOutPut>(
      input.channelId,
    );

    let result: GetBaseChannelOutPut;

    if (chachedChannel) {
      result = {
        channelName: chachedChannel.channelName,
        profileImageUrl: chachedChannel.profileImageUrl,
      };
    } else {
      const channel = await this._channelRepo.findByChannelId(input.channelId);
      if (!channel) {
        throw new BadRequestError(ERROR_MESSAGES.CHANNEL_NOT_EXISTS);
      }
      result = {
        channelName: channel.channelName,
        profileImageUrl: channel.profileImageUrl,
      };
    }

    return result;
  }
}
