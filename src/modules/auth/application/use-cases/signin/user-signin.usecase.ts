import {
  IGenerateTokenUseCase,
  IPasswordHasher,
  ISigninUseCase,
} from '../../ports';

import { SigninInput } from '../../inputs';
import { BadRequestError } from '@/shared/errors';
import { SigninUseCaseOutPut } from '../../output';
import { TokenPayload } from '@/modules/auth/domain';
import { SCOPE } from '@/modules/auth-security/domain';
import { ILogger } from '@/shared/logger/logger.interface';
import { UserRepositoryPort } from '@/modules/user/application';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { ResponseData } from '../../../domain/service/signin-reposnse';
import { Email, HashedPassword } from '@/modules/user/domain/value-objects';

export class SigninUseCase implements ISigninUseCase {
  constructor(
    private _userRepository: UserRepositoryPort,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenGenerator: IGenerateTokenUseCase,
    private readonly _logger: ILogger,
  ) {}

  async execute(input: SigninInput): Promise<SigninUseCaseOutPut> {
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
