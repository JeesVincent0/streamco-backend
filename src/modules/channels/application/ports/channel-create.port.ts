import { SucceessResType } from '@/shared/types/success-res.type';
import { CreateChannelInput } from '../inputs';

export interface ChannelCreatePort {
  execute(input: CreateChannelInput): Promise<SucceessResType>;
}
