import { CHANNEL_STATUS } from '@/modules/channels/domain/enums';

export interface GetAllChannelsUseCaseOutPut {
  status: string;
  message: string;
  data: {
    pagination: {
      currentPage: number;
      limit: number;
      totalPages: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };

    channels: {
      id: string;
      channelName: string;
      channelId: string;
      subscribers: number;
      isLive: boolean;
      scheduledLives: number;
      status: CHANNEL_STATUS;
    }[];
  };
}
