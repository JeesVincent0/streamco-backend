import { GetChannelsInput } from '../inputs/get-channels.input';
import { GetChannelsOutput } from '../output';

export interface IGetChannelsUseCase {
  execute(input: GetChannelsInput): Promise<GetChannelsOutput>;
}
