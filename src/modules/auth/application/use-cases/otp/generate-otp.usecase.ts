import { OtpPolicy } from '@/shared/domain';
import { Email } from '@/modules/user/domain/';
import { GenerateOtpInput } from '../../inputs';
import { UniqueIdService } from '@/shared/domain';
import { ILogger } from '@/shared/logger/logger.interface';
import { ICacheBaseRepo } from '@/shared/application/ports';
import { UserRepositoryPort } from '@/modules/user/application';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { type IMailService, IOtpService, IPasswordHasher } from '../../ports';
import { IGenerateOtpUseCase } from '../../ports/usecase/generate-otp-usecase.port';
import { GenerateOtpUsecaseOutPut } from '../../output/generate-otp.usecase.output';

/*
 *
 * Use case for generating OTP.
 * It checks if the user exists with the provided email,
 * generates an OTP,
 * hashes the OTP,
 * creates an OTP state with the policy,
 * saves the OTP state in the cache with user ID as key and 5 minutes expiration time,
 * and sends the OTP to the user's email.
 *
 */

export class GenerateOtpUseCase implements IGenerateOtpUseCase {
  constructor(
    private readonly _otpRepository: IOtpService,
    private readonly _userRepository: UserRepositoryPort,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _cacheRepository: ICacheBaseRepo,
    private readonly _mailService: IMailService,
    private readonly _logger: ILogger,
  ) {}

  async execute(input: GenerateOtpInput): Promise<GenerateOtpUsecaseOutPut> {
    const email = Email.create(input.email);

    // Checking if user existing with the email and if not existing throw error
    const userExiting = await this._userRepository.findByEmail(email);
    if (!userExiting) {
      this._logger.error({
        event: LOG_EVENTS.USER_NOT_FOUND,
        context: 'GenerateOtpUseCase',
        userEmail: email.getValue(),
      });
      const id = UniqueIdService.generate();
      const time = new Date(Date.now() + 30000);
      return {
        status: 'success',
        message: 'OTP generated and sent to email successfully',
        data: { id, purpose: input.purpose, otpResendAt: time },
      };
    }

    // OTP generating and OTP hashing
    const otp = this._otpRepository.generate();
    const hashedOtp = await this._passwordHasher.hash(otp.toString());

    const id = userExiting.id;

    // Creating OTP state with policy
    const otpState = OtpPolicy.createInitialState(
      userExiting.id,
      email.getValue(),
      hashedOtp,
      input.purpose,
    );

    // Saving OTP state in cache with user ID as key and 5 minutes expiration time
    await this._cacheRepository.save(id, otpState, 300);
    this._logger.log({
      event: LOG_EVENTS.OTP_CREATED,
      constext: 'GenerateOtpUseCase',
      userId: id,
    });

    // mail service to send OTP to user email
    await this._mailService.sendOtp(email, otp);

    return {
      status: 'success',
      message: 'OTP generated and sent to email successfully',
      data: { id, purpose: input.purpose, otpResendAt: otpState.otpResendAt },
    };
  }
}
