import { OtpPolicy, OtpState } from '@/shared/domain';
import { ResendOtpInterface } from '../ports/resend-otp.port';
import {
  CacheBaseRepoPort,
  GenerateOtpPort,
  MailServicePort,
  passwordHasherPort,
} from '../ports';
import { FileLogger } from '@/shared/logger/file-logger';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { Email } from '@/modules/user/domain';

export class ResendOtpUsecae implements ResendOtpInterface {
  constructor(
    private readonly _cachedRepository: CacheBaseRepoPort,
    private readonly _generateOtp: GenerateOtpPort,
    private readonly _otpHasher: passwordHasherPort,
    private readonly _mailService: MailServicePort,
    private readonly _logger: FileLogger,
  ) {}
  async execute(input: { id: string }): Promise<{ otpResendAt: Date }> {
    const cachedUser = await this._cachedRepository.get<OtpState>(input.id);

    if (!cachedUser) {
      throw new BadRequestError(ERROR_MESSAGES.PLEASE_TRY_AGAIN, {
        cachedUser: false,
      });
    }

    OtpPolicy.canResendOtp(cachedUser);

    const otp = this._generateOtp.execute();
    const hashedOtp = await this._otpHasher.hash(otp);
    const otpState = OtpPolicy.createStateAFterResendOtp(cachedUser, hashedOtp);

    await this._cachedRepository.save(input.id, otpState, 300);

    this._logger.log({
      event: LOG_EVENTS.OTP_CREATED,
      context: 'ResendOtpUseCase',
      id: input.id,
    });
    await this._mailService.execute(Email.create(cachedUser.email), otp);

    return {
      otpResendAt: otpState.otpResendAt,
    };
  }
}
