import { AccessTokenPayload } from '@/shared/interfaces';
import { SucceessResType } from '@/shared/types/success-res.type';

export interface ISignoutUseCase {
  execute(payload: AccessTokenPayload): Promise<SucceessResType>;
}
