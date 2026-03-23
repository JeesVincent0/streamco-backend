import { UserRepositoryPort } from '@/modules/user/application';
import { SigninInput } from '../../inputs';
import { Email, Password, UserRole } from '@/modules/user/domain';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { IAdminSigninUseCase, IPasswordHasher } from '../../ports';
import { ResponseData, TokenPayload } from '@/modules/auth/domain';
import { SCOPE } from '@/modules/auth-security/domain';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { GenerateTokenUseCase } from '../token/generate-token.usecase';
import { SigninUseCaseOutPut } from '../../output';

export class AdminSigninUseCase implements IAdminSigninUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _passwordHashser: IPasswordHasher,
    private readonly _generateTokenUseCase: GenerateTokenUseCase,
    private readonly _logger: FileLogger,
  ) {}
  async execute(input: SigninInput): Promise<SigninUseCaseOutPut> {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    const user = await this._userRepo.findByEmail(email);
    if (!user || !user.password) {
      this._logger.error({
        event: LOG_EVENTS.INCORRECT_CREDENTIALS,
        constext: 'AdminSigninUseCase',
        userEmail: email.getValue(),
      });
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    user.assertIsAdmin();

    const isPasswordMatch = await this._passwordHashser.compare(
      password,
      user.password.getValue(),
    );

    if (!isPasswordMatch) {
      this._logger.error({
        event: LOG_EVENTS.WRONG_PASSWORD_ENTERED,
        context: 'AdminSigninUseCase',
        userId: user.id,
      });
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    if (!process.env.JWT_ISSUER || !process.env.JWT_AUDIENCE) {
      this._logger.error({
        event: LOG_EVENTS.ENV_FILE_NOT_ATTACHED,
        context: 'AdminSigninUseCase',
      });
      throw new Error(ERROR_MESSAGES.ENV_FILE_NOT_ATTACHED);
    }

    const accessPayload = TokenPayload.generateAccessPayload(
      user.id,
      UserRole.ADMIN,
      `${SCOPE.ADMIN_WRITE} ${SCOPE.ADMIN_READ} ${SCOPE.USER_READ} ${SCOPE.USER_WRITE}`,
    );
    const refreshPayload = TokenPayload.generateRefreshPayload(
      user.id,
      UserRole.ADMIN,
    );

    const { accessToken, refreshToken } =
      await this._generateTokenUseCase.execute(accessPayload, refreshPayload);

    this._logger.log({
      event: LOG_EVENTS.ADMIN_LOGGED_IN,
      context: 'AdminSigninUseCase',
      userId: user.id,
    });

    const responseData = ResponseData.getDate(
      user.id,
      user.displayName,
      user.email,
      user.role,
      user.avatarUrl,
    );

    return { accessToken, refreshToken, responseData };
  }
}
