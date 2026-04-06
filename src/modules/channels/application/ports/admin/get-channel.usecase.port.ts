import { Channel } from '@/modules/channels/domain/entity';
import { GetChannelInput } from '../../inputs';

export interface IGetChannelUseCase {
  execute(input: GetChannelInput): Promise<Channel>;
}
