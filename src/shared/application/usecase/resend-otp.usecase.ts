import {
  ICacheBaseRepo,
  GenerateOtpPort,
  IMailService,
  passwordHasherPort,
} from '../ports';

import { Email } from '@/modules/user/domain';
import { BadRequestError } from '@/shared/errors';
import { OtpPolicy, OtpState } from '@/shared/domain';
import { ILogger } from '@/shared/logger/logger.interface';
import { ResendOtpInterface } from '../ports/resend-otp.port';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';

export class ResendOtpUsecae implements ResendOtpInterface {
  constructor(
    private readonly _cachedRepository: ICacheBaseRepo,
    private readonly _generateOtp: GenerateOtpPort,
    private readonly _otpHasher: passwordHasherPort,
    private readonly _mailService: IMailService,
    private readonly _logger: ILogger,
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
