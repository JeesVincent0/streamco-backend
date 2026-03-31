import {
  ICreateUserWithGoogleAuthUseCase,
  UserRepositoryPort,
} from '@/modules/user/application';
import { TokenPayload } from '../../../domain';
import { GoogleAuthInPut } from '../../inputs';
import { IGenerateTokenUseCase, IGoogleAuthUseCase } from '../../ports';
import { BadRequestError } from '@/shared/errors';
import { GoogleAuthUseCaseOutPut } from '../../output';
import { SCOPE } from '@/modules/auth-security/domain';
import { FileLogger } from '@/shared/logger/file-logger';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { Email, UserRole, UserStatus } from '@/modules/user/domain';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';

export class GoogleAuthUseCase implements IGoogleAuthUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _createUserWithGoogleAuth: ICreateUserWithGoogleAuthUseCase,
    private readonly _generateTokenUseCase: IGenerateTokenUseCase,
    private readonly _logger: FileLogger,
  ) {}
  async execute(input: GoogleAuthInPut): Promise<GoogleAuthUseCaseOutPut> {
    const email = Email.create(input.email);

    let user = await this._userRepo.findByEmail(email);
    if (!user) {
      if (input.intent === 'login') input.role = UserRole.USER;
      user = await this._createUserWithGoogleAuth.execute(input);
      this._logger.log({
        event: LOG_EVENTS.USER_CREATED,
        context: 'GoogleAuthUseCase',
        userId: user.id,
      });
    } else {
      if (user.status === UserStatus.SUSPENDED) {
        this._logger.log({
          event: LOG_EVENTS.USER_SIGNIN_FAILED,
          context: 'GoogleAuthUseCase',
          userId: user.id,
          reason: 'User is suspended',
        });
        throw new BadRequestError(ERROR_MESSAGES.YOUR_ACCOUNT_SUSPENDED);
      }
      if (user.status === UserStatus.DELETED) {
        this._logger.log({
          event: LOG_EVENTS.USER_SIGNIN_FAILED,
          context: 'GoogleAuthUseCase',
          userId: user.id,
          reason: 'User is deleted',
        });
        throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
      }
    }

    const accessPayload = TokenPayload.generateAccessPayload(
      user.id,
      user.role,
      `${SCOPE.USER_READ} ${SCOPE.USER_WRITE}`,
    );
    const refreshPayload = TokenPayload.generateRefreshPayload(
      user.id,
      user.role,
    );

    console.log('reached');
    const { accessToken, refreshToken } =
      await this._generateTokenUseCase.execute(accessPayload, refreshPayload);
    console.log('end');

    this._logger.log({
      event: LOG_EVENTS.USER_SIGNIN_SUCCESSFULL,
      context: 'GoogleAuthUseCase',
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
      role: user.role,
      name: user.displayName,
    };
  }
}
