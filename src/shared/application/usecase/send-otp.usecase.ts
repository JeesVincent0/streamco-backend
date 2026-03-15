import { Email } from '@/modules/user/domain';
import {
  CacheBaseRepoPort,
  MailServicePort,
  passwordHasherPort,
  SendOtpInterface,
  GenerateOtpPort,
} from '../ports';
import { OtpPurpose } from '@/modules/auth/domain';

export class SendOtpUseCase implements SendOtpInterface {
  constructor(
    private readonly _generateOtp: GenerateOtpPort,
    private readonly _otpHasher: passwordHasherPort,
    private readonly _cacheRepo: CacheBaseRepoPort,
    private readonly _sendOtp: MailServicePort,
  ) {}
  async execute(
    id: string,
    email: Email,
    purpose: OtpPurpose,
  ): Promise<{ id: string; purpose: OtpPurpose }> {
    const otp = this._generateOtp.execute();
    const hashedOtp = await this._otpHasher.hash(otp);
    await this._cacheRepo.save(
      id,
      { email: email.getValue(), hashedOtp, purpose },
      300,
    );
    await this._sendOtp.execute(email, otp);
    return { id, purpose };
  }
}
