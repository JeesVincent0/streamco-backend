import {
  CreateUserWIthGoogleAuthPort,
  UserRepositoryPort,
} from '@/modules/user/application';
import { Email, UserRole } from '@/modules/user/domain';
import { TokenPayload } from '../../../domain';
import { SCOPE } from '@/modules/auth-security/domain';
import { GoogleAuth } from '../../inputs';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { FileLogger } from '@/shared/logger/file-logger';
import { GenerateTokenUseCase } from '../token/generate-token.usecase';

export class GoogleAuthUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _createUserWithGoogleAuth: CreateUserWIthGoogleAuthPort,
    private readonly _generateTokenUseCase: GenerateTokenUseCase,
    private readonly _logger: FileLogger,
  ) {}
  async execute(input: GoogleAuth) {
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
    }

    const accessPayload = TokenPayload.generateAccessPayload(
      user.id,
      user.role,
      `${SCOPE.USER_READ} ${SCOPE.USER_WRITE}`,
    );
    const refreshPayload = TokenPayload.generateRefreshPayload(user.id);

    const { accessToken, refreshToken } =
      await this._generateTokenUseCase.execute(accessPayload, refreshPayload);

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
