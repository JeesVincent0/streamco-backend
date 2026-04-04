import { Channel } from '@/modules/channels/domain/entity';

export interface GetAllChannelsUseCaseOutPut {
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };

  channels: Channel[];
}
