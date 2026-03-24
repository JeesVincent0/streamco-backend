import { SCOPE } from '@/modules/auth-security/domain';
import { ConfirmRegistrationInput } from '../../inputs';
import { FileLogger } from '@/shared/logger/file-logger';
import { OtpPurpose } from '@/modules/auth/domain/enums';
import { Email } from '@/modules/user/domain/value-objects';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { ResponseData, TokenPayload } from '@/modules/auth/domain';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { UserRepositoryPort } from '@/modules/user/application/ports';
import {
  IConfirmSignupUserUseCase,
  IGenerateTokenUseCase,
  IVerifyOtpUseCase,
} from '../../ports';
import { SigninUseCaseOutPut } from '../../output';

/*
 *
 * Use case for confirming user registration.
 * It verifies the OTP provided by the user,
 * checks the OTP purpose,
 * finds the user by email,
 * verifies the user,
 * and saves the updated user.
 *
 */

export class ConfirmSignupUserUseCase implements IConfirmSignupUserUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _verifyOtpUseCase: IVerifyOtpUseCase,
    private readonly _generateTokenUseCase: IGenerateTokenUseCase,
    private readonly _logger: FileLogger,
  ) {}
  async execute(input: ConfirmRegistrationInput): Promise<SigninUseCaseOutPut> {
    // Verifying the OTP provided by the user
    const result = await this._verifyOtpUseCase.execute({
      id: input.id,
      otp: input.otp,
      purpose: OtpPurpose.REGISTRATION,
    });

    const email = Email.create(result.email);

    // Finding user by email
    const user = await this._userRepo.findByEmail(email);
    if (!user) {
      this._logger.error({
        event: LOG_EVENTS.USER_NOT_FOUND,
        context: 'ConfirmSignupUserUseCase',
        userEmail: email.getValue(),
      });
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    user.verify();

    // Saving updated user
    await this._userRepo.save(user);
    this._logger.log({
      event: LOG_EVENTS.USER_VERIFIED,
      context: 'ConfirmSignupUserUseCase',
      userId: user.id,
    });

    const accessTokenPayload = TokenPayload.generateAccessPayload(
      user.id,
      user.role,
      `${SCOPE.USER_READ} ${SCOPE.USER_WRITE}`,
    );
    const refreshTokenPayload = TokenPayload.generateRefreshPayload(
      user.id,
      user.role,
    );

    const { accessToken, refreshToken } =
      await this._generateTokenUseCase.execute(
        accessTokenPayload,
        refreshTokenPayload,
      );

    const responseData = ResponseData.getDate(
      user.id,
      user.displayName,
      user.email,
      user.role,
      user.avatarUrl,
    );

    this._logger.log({
      event: LOG_EVENTS.USER_SIGNIN_SUCCESSFULL,
      context: 'ConfirmSignupUserUseCase',
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
      responseData,
    };
  }
}
