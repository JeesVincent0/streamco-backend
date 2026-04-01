import { UpdateChannelImagesInput } from '../inputs';
import { UpdateChannelImagesOutput } from '../output';

export interface IUpdateChannelImageUsecase {
  execute(input: UpdateChannelImagesInput): Promise<UpdateChannelImagesOutput>;
}
