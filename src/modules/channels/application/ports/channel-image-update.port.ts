import { UpdateChannelImagesInput } from '../inputs';
import { UpdateChannelImagesOutput } from '../output';

export interface UpdateChannelImagesPort {
  execute(input: UpdateChannelImagesInput): Promise<UpdateChannelImagesOutput>;
}
