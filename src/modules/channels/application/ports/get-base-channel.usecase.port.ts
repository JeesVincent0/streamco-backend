import { GetBaseChannelInput } from '../inputs';
import { GetBaseChannelOutPut } from '../output';

export interface IGetBaseChannelUseCase {
  execute(input: GetBaseChannelInput): Promise<GetBaseChannelOutPut>;
}
