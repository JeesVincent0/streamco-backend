import { ResendOtpUseCaseOutPut } from '../../output';

export interface IResendOtpUseCase {
  execute(input: { id: string }): Promise<ResendOtpUseCaseOutPut>;
}
