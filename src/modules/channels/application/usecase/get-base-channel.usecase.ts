import { GetChannelInput } from '../inputs';
import { BadRequestError } from '@/shared/errors';
import { IChannelRepo, IGetBaseChannelUseCase } from '../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { Channel } from '../../domain/entity';

export class GetBaseChannelUseCase implements IGetBaseChannelUseCase {
  constructor(private readonly _channelRepo: IChannelRepo) {}

  async execute(input: GetChannelInput): Promise<Channel> {
    const channel = await this._channelRepo.findByChannelId(input.channelId);

    if (!channel) {
      throw new BadRequestError(ERROR_MESSAGES.CHANNEL_NOT_EXISTS);
    }

    return channel;
  }
}
