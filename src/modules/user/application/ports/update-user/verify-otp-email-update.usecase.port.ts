import { VerifyOtpInput } from '@/shared/application/input';
import { SucceessResType } from '@/shared/types/success-res.type';

export interface IVerifyOtpEmailUpdateUseCase {
  execute(input: VerifyOtpInput): Promise<SucceessResType>;
}
