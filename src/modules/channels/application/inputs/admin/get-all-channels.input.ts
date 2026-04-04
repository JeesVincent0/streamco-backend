import { CHANNEL_STATUS } from '@/modules/channels/domain/enums';

export interface GetAllChannelsUseCaseInPut {
  page: number;
  limit: number;
  sortBy?:
    | 'channelId'
    | 'channelName'
    | 'subscribers'
    | 'createdAt'
    | 'scheduledLives';
  order?: 'asc' | 'desc';
  isLive?: boolean;
  search?: string;
  status?: CHANNEL_STATUS;
}
