import { Channel } from '../../domain/entity';
export interface ChannelFilterParams {
  skip: number;
  limit: number;
  search?: string;
  userId?: string;
}

export interface PaginatedChannelsResult {
  channels: Channel[];
  total: number;
}

export interface IChannelRepo {
  findByChannelId(channelId: string): Promise<Channel | null>;
  findByUserId(userId: string): Promise<Channel | null>;
  save(channel: Channel): Promise<void>;
  findChannelsWithPagination(
    params: ChannelFilterParams,
  ): Promise<PaginatedChannelsResult>;
}
