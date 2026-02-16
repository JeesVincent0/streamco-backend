import { BadRequestError } from '@/shared/errors';
import { OtpPolicy, OtpSate } from '../../../domain';
import {
  AuthCachedUserRepositoryPort,
  MailServicePort,
  OtpServicePort,
  PasswordHasherPort,
} from '../../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';

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
      throw new BadRequestError(ERROR_MESSAGES.PLEASE_TRY_AGAIN, {
        cachedUser: false,
      });
    }

    OtpPolicy.canResendOtp(cachedUser);

    const otp = this._otpService.generate();
    const hashedOtp = await this._otpHasher.hash(otp);
    const otpState = OtpPolicy.createStateAFterResendOtp(cachedUser, hashedOtp);

    await this._cachedRepository.save(input.id, otpState, 300);

    console.log({ id: input.id, email: otpState.email, otp });

    // await this._mailService.sendOtp(Email.create(cachedUser.email), otp);

    return {
      success: true,
      message: 'New OTP is send to the email',
      data: {
        otpResendAt: otpState.otpResendAt,
      },
    };
  }
}
