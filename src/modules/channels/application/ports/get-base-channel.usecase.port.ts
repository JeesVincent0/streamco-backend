import { GetChannelInput } from '../inputs';
import { GetBaseChannelOutPut } from '../output';

export interface IGetBaseChannelUseCase {
  execute(input: GetChannelInput): Promise<GetBaseChannelOutPut>;
}
