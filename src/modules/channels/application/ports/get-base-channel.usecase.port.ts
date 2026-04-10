import { GetChannelInput } from '../inputs';
import { Channel } from '../../domain/entity';

export interface IGetBaseChannelUseCase {
  execute(input: GetChannelInput): Promise<Channel>;
}
