import { BadRequestError } from '@/shared/errors';
import { Channel } from '@/modules/channels/domain/entity';
import { IChannelRepo, IGetChannelUseCase } from '../../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { GetChannelInput } from '../../inputs';

export class GetChannelUseCase implements IGetChannelUseCase {
  constructor(private readonly _getChannelRepo: IChannelRepo) {}
  async execute(input: GetChannelInput): Promise<Channel> {
    const channel = await this._getChannelRepo.findByChannelId(input.channelId);

    if (!channel) {
      throw new BadRequestError(ERROR_MESSAGES.CHANNEL_NOT_EXISTS);
    }

    return channel;
  }
}
