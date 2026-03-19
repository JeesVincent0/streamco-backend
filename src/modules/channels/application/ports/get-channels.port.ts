import { GetChannelsInput } from '../inputs/get-channels.input';
import { GetChannelsOutput } from '../output';

export interface GetChannelsPort {
  execute(input: GetChannelsInput): Promise<GetChannelsOutput>;
}
