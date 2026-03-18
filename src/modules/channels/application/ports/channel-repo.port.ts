// application/ports/channel-repository.port.ts
import { Channel } from '../../domain/entity';

export interface ChannelRepoPort {
  findByChannelId(channelId: string): Promise<Channel | null>;
  findByUserId(userId: string): Promise<Channel | null>;
  save(channel: Channel): Promise<void>;
}
