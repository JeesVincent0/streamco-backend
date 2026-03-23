import { VerifyResetPasswordOtpInput } from '../../inputs';

export interface IVerifyResetPasswordOtpUseCase {
  execute(input: VerifyResetPasswordOtpInput): Promise<{ token: string }>;
}
