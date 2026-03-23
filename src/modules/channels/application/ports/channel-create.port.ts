import { SucceessResType } from '@/shared/types/success-res.type';
import { CreateChannelInput } from '../inputs';

export interface ICreateChannelUseCase {
  execute(input: CreateChannelInput): Promise<SucceessResType>;
}
