import { GenerateOtpInput } from '../../inputs';
import { GenerateOtpUsecaseOutPut } from '../../output/generate-otp.usecase.output';

export interface IGenerateOtpUseCase {
  execute(input: GenerateOtpInput): Promise<GenerateOtpUsecaseOutPut>;
}
