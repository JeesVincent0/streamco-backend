import { UserRepositoryPort } from '@/modules/user/application/ports';
import { ConfirmRegistrationInput } from '../../inputs';
import { VerifyOtpUseCase } from '../otp/verify-otp.usecase';
import { OtpPurpose } from '@/modules/auth/domain/enums';
import { Email } from '@/modules/user/domain/value-objects';
import { ResponseData, TokenPayload } from '@/modules/auth/domain';
import { TokenServicePort } from '@/modules/auth-security/application';
import { SCOPE } from '@/modules/auth-security/domain';

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

export class ConfirmSignupUserUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _verifyOtpUseCase: VerifyOtpUseCase,
    private readonly _tokenService: TokenServicePort,
  ) {}
  async execute(input: ConfirmRegistrationInput) {
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
      throw new Error('User not found');
    }

    user.verify();

    // Saving updated user
    await this._userRepo.save(user);

    const accessTokenPayload = TokenPayload.generateAccessPayload(
      user.id,
      user.role,
      `${SCOPE.USER_READ} ${SCOPE.USER_WRITE}`,
    );
    const refreshTokenPayload = TokenPayload.generateRefreshPayload(user.id);

    const accessToken =
      await this._tokenService.generateAccessToken(accessTokenPayload);
    const refreshToken =
      await this._tokenService.generateRefreshToken(refreshTokenPayload);

    const responseData = ResponseData.getDate(
      user.id,
      user.displayName,
      user.email,
      user.role,
      user.avatarUrl,
    );

    return {
      accessToken,
      refreshToken,
      responseData,
    };
  }
}
