import { BadRequestError } from '@/shared/errors';
import { OtpTimer } from '../../domain/service/get-otp-timer';
import { OtpPolicy, OtpSate } from '../../domain/service/otp-policy';
import {
  AuthCachedUserRepositoryPort,
  MailServicePort,
  OtpServicePort,
  PasswordHasherPort,
} from '../ports';
import { Email } from '@/modules/user/domain/value-objects';

export class ResendOtpUseCase {
  constructor(
    private readonly _cachedRepository: AuthCachedUserRepositoryPort,
    private readonly _otpService: OtpServicePort,
    private readonly _otpHasher: PasswordHasherPort,
    private readonly _mailService: MailServicePort,
  ) {}

  async execute(input: { id: string }) {
    const cachedUser = await this._cachedRepository.get<OtpSate>(input.id);

    if (!cachedUser) {
      throw new BadRequestError('Please try again', {
        cachedUser: false,
      });
    }

    if (OtpPolicy.canResendOtp(cachedUser)) {
      throw new BadRequestError('Too may attempts, try again after sometimes', {
        cachedUser: false,
      });
    }
    const otp = this._otpService.generate();
    const hashedOtp = await this._otpHasher.hash(otp);
    const otpState = OtpPolicy.createStateAFterResendOtp(cachedUser, hashedOtp);

    await this._cachedRepository.save(input.id, otpState, 300);

    console.log({ id: input.id, email: otpState.email, otp });

    await this._mailService.sendOtp(Email.create(cachedUser.email), otp);

    const remainingTime = OtpTimer.Get(otpState.resendAvalableAt);

    return {
      success: true,
      message: 'New OTP is send to the email',
      data: {
        timer: remainingTime,
      },
    };
  }
}
