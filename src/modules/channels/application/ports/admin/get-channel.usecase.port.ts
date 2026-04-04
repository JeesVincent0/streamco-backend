import { Channel } from '@/modules/channels/domain/entity';

export interface IGetChannelUseCase {
  execute(input: { channelId: string }): Promise<Channel>;
}
