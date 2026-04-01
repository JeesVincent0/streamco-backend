import { VerifyOtpInput } from '@/shared/application/input';
import { VerifyOtpUseCaseOutput } from '../../output';

export interface IVerifyOtpUseCase {
  execute(input: VerifyOtpInput): Promise<VerifyOtpUseCaseOutput>;
}
