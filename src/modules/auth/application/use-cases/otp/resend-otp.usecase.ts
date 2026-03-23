import { BadRequestError } from '@/shared/errors';
import { OtpPolicy, OtpState } from '@/shared/domain';
import { IMailService, IOtpService, IPasswordHasher } from '../../ports';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { Email } from '@/modules/user/domain';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { ICacheBaseRepo } from '@/shared/application/ports';
import { IResendOtpUseCase } from '../../ports/usecase/resend-otp-usecase.port';
import { ResendOtpUseCaseOutPut } from '../../output';

export class ResendOtpUseCase implements IResendOtpUseCase {
  constructor(
    private readonly _cachedRepository: ICacheBaseRepo,
    private readonly _otpService: IOtpService,
    private readonly _otpHasher: IPasswordHasher,
    private readonly _mailService: IMailService,
    private readonly _logger: FileLogger,
  ) {}

  async execute(input: { id: string }): Promise<ResendOtpUseCaseOutPut> {
    const cachedUser = await this._cachedRepository.get<OtpState>(input.id);

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

    this._logger.log({
      event: LOG_EVENTS.OTP_CREATED,
      context: 'ResendOtpUseCase',
      id: input.id,
    });
    await this._mailService.sendOtp(Email.create(cachedUser.email), otp);

    return {
      status: 'success',
      message: 'New OTP is send to the email',
      data: {
        otpResendAt: otpState.otpResendAt,
      },
    };
  }
}
