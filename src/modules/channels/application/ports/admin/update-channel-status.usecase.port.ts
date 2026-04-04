import { CHANNEL_STATUS } from '@/modules/channels/domain/enums';

export interface IUpdateChannelStatusUseCase {
  execute(input: { channelId: string; status: CHANNEL_STATUS });
}
