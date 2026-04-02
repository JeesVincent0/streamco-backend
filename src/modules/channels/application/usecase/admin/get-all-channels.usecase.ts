import { CHANNEL_STATUS } from '@/modules/channels/domain/enums';
import { GetAllChannelsUseCaseInPut } from '../../inputs';
import { GetAllChannelsUseCaseOutPut } from '../../output';
import { IGetAllChannelsUseCase } from '../../ports';

export class GetAllChannelsUseCase implements IGetAllChannelsUseCase {
  execute(input: GetAllChannelsUseCaseInPut): GetAllChannelsUseCaseOutPut {
    return {
      status: 'success',
      message: 'Channels retrieved successfully',
      data: {
        pagination: {
          currentPage: 1,
          limit: 10,
          totalPages: 5,
          totalItems: 48,
          hasNextPage: true,
          hasPrevPage: false,
        },
        channels: [
          {
            id: '65a1b2c3d4e5f6g7h8i9j001',
            channelName: 'Code & Chill',
            channelId: 'codeandchill',
            subscribers: 1250000,
            isLive: true,
            scheduledLives: 2,
            status: CHANNEL_STATUS.BLOCKED,
          },
          {
            id: '65a1b2c3d4e5f6g7h8i9j002',
            channelName: 'Daily Tech News',
            channelId: 'dailytechnews',
            subscribers: 45000,
            isLive: false,
            scheduledLives: 0,
            status: CHANNEL_STATUS.ACTIVE,
          },
          {
            id: '65a1b2c3d4e5f6g7h8i9j003',
            channelName: 'Crypto Bros Unfiltered',
            channelId: 'cryptobros',
            subscribers: 8900,
            isLive: false,
            scheduledLives: 1,
            status: CHANNEL_STATUS.ACTIVE,
          },
          {
            id: '65a1b2c3d4e5f6g7h8i9j004',
            channelName: 'Gaming Legends',
            channelId: 'gaminglegends_ttv',
            subscribers: 3400000,
            isLive: true,
            scheduledLives: 5,
            status: CHANNEL_STATUS.BLOCKED,
          },
          {
            id: '65a1b2c3d4e5f6g7h8i9j005',
            channelName: 'SpamBot Central',
            channelId: 'freemoneyxyz',
            subscribers: 12,
            isLive: false,
            scheduledLives: 0,
            status: CHANNEL_STATUS.ACTIVE,
          },
        ],
      },
    };
  }
}
