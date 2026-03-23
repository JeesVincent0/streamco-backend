import { Email } from '@/modules/user/domain';
import {
  ICacheBaseRepo,
  IMailService,
  passwordHasherPort,
  SendOtpInterface,
  GenerateOtpPort,
} from '../ports';
import { OtpPurpose } from '@/modules/auth/domain';
import { OtpPolicy } from '@/shared/domain';

export class SendOtpUseCase implements SendOtpInterface {
  constructor(
    private readonly _generateOtp: GenerateOtpPort,
    private readonly _otpHasher: passwordHasherPort,
    private readonly _cacheRepo: ICacheBaseRepo,
    private readonly _sendOtp: IMailService,
  ) {}
  async execute(
    id: string,
    email: Email,
    purpose: OtpPurpose,
  ): Promise<{ id: string; purpose: OtpPurpose; otpResendAt: Date }> {
    const otp = this._generateOtp.execute();
    const hashedOtp = await this._otpHasher.hash(otp);
    const otpState = OtpPolicy.createInitialState(
      id,
      email.getValue(),
      hashedOtp,
      purpose,
    );
    await this._cacheRepo.save(id, otpState, 300);
    await this._sendOtp.execute(email, otp);
    return { id, purpose, otpResendAt: otpState.otpResendAt };
  }
}
