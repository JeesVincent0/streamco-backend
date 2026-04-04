import { CHANNEL_STATUS } from '@/modules/channels/domain/enums';
import { IChannelRepo, IUpdateChannelStatusUseCase } from '../../ports';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

export class UpdateChannelStatusUseCase implements IUpdateChannelStatusUseCase {
  constructor(private readonly _channelRepo: IChannelRepo) {}
  async execute(input: { channelId: string; status: CHANNEL_STATUS }) {
    const channel = await this._channelRepo.findByChannelId(input.channelId);

    if (!channel) {
      throw new BadRequestError(ERROR_MESSAGES.CHANNEL_NOT_EXISTS);
    }

    if (input.status === CHANNEL_STATUS.ACTIVE) {
      channel.activateChannel();
    } else if (input.status === CHANNEL_STATUS.BLOCKED) {
      channel.blockChannel();
    } else {
      throw new BadRequestError(ERROR_MESSAGES.WRONG_STATUS);
    }

    await this._channelRepo.save(channel);
  }
}
