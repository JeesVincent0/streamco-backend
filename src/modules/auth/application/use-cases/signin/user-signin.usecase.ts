import { Email, HashedPassword } from '@/modules/user/domain/value-objects';
import { SigninInput } from '../../inputs';
import { UserRepositoryPort } from '@/modules/user/application';
import { BadRequestError } from '@/shared/errors';
import { PasswordHasherPort } from '../../ports';
import { ResponseData } from '../../../domain/service/signin-reposnse';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { TokenPayload } from '@/modules/auth/domain';
import { SCOPE } from '@/modules/auth-security/domain';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { GenerateTokenUseCase } from '../token/generate-token.usecase';

export class SigninUseCase {
  constructor(
    private _userRepository: UserRepositoryPort,
    private readonly _passwordHasher: PasswordHasherPort,
    private readonly _tokenGenerator: GenerateTokenUseCase,
    private readonly _logger: FileLogger,
  ) {}

  async execute(input: SigninInput) {
    const email = Email.create(input.email);

    const existingUser = await this._userRepository.findByEmail(email);

    if (!existingUser) {
      this._logger.error({
        event: LOG_EVENTS.WRONG_EMAIL_ID,
        context: 'SigninUseCase',
        userEmail: email.getValue(),
      });
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    if (!existingUser.password?.getValue()) {
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    } else {
      HashedPassword.create(existingUser.password?.getValue());
    }
    existingUser.assertCanSignin();

    const isPasswordMatch = await this._passwordHasher.compare(
      input.password,
      existingUser.password.getValue(),
    );

    if (!isPasswordMatch) {
      this._logger.error({
        event: LOG_EVENTS.WRONG_PASSWORD_ENTERED,
        context: 'SigninUseCase',
        useId: existingUser.id,
      });
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    const responseData = ResponseData.getDate(
      existingUser.id,
      existingUser.displayName,
      existingUser.email,
      existingUser.role,
      existingUser.avatarUrl,
    );

    const accessTokePayload = TokenPayload.generateAccessPayload(
      existingUser.id,
      existingUser.role,
      `${SCOPE.USER_READ} ${SCOPE.USER_WRITE}`,
    );
    const refreshTokenPayload = TokenPayload.generateRefreshPayload(
      existingUser.id,
      existingUser.role,
    );

    const { accessToken, refreshToken } = await this._tokenGenerator.execute(
      accessTokePayload,
      refreshTokenPayload,
    );

    this._logger.log({
      event: LOG_EVENTS.USER_SIGNIN_SUCCESSFULL,
      context: 'SigninUseCase',
      userId: existingUser.id,
    });

    return {
      accessToken,
      refreshToken,
      responseData,
    };
  }
}
