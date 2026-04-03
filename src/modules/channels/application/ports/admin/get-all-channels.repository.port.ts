import { Channel } from '@/modules/channels/domain/entity';
import { GetAllChannelsUseCaseInPut } from '../../inputs';

export interface IGetAllChannelsRepository {
  execute(input: GetAllChannelsUseCaseInPut): Promise<{
    channels: Channel[];
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
    };
  }>;
}
