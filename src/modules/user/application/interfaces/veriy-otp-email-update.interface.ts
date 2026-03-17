import { VerifyOtpInput } from '@/shared/application/input';
import { SucceessResType } from '@/shared/types/success-res.type';

export interface VerifyOtpEmailUpdateInterface {
  execute(input: VerifyOtpInput): Promise<SucceessResType>;
}
