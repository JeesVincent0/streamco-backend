import { TOKEN_TYPE, VerifyPassword } from '@/modules/auth/domain';
import { UserRepositoryPort } from '@/modules/user/application';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { IPasswordHasher, IResetPasswordUseCase } from '../../ports';
import { HashedPassword } from '@/modules/user/domain';
import { TokenBlackListUseCase } from '../token';
import { ResetPasswordInput } from '../../inputs';
import { FileLogger } from '@/shared/logger/file-logger';
import { LOG_EVENTS } from '@/shared/constants/log-events.constants';
import { ResetPasswordUseCaseOutPut } from '../../output';

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _passwordHasher: IPasswordHasher,
    private readonly _tokenBlacklistUseCase: TokenBlackListUseCase,
    private readonly _logger: FileLogger,
  ) {}
  async execute(
    input: ResetPasswordInput,
  ): Promise<ResetPasswordUseCaseOutPut> {
    const { password } = VerifyPassword.verify({
      password: input.password,
      confirmPassword: input.confirmPassword,
    });

    const user = await this._userRepo.findById(input.payload.sub);
    if (!user) {
      this._logger.log({
        event: LOG_EVENTS.USER_NOT_FOUND,
        constext: 'ResetPasswordUseCase',
        userId: input.payload.sub,
      });
      throw new BadRequestError(ERROR_MESSAGES.MISSING_TOKEN);
    }

    const hashedPassword = await this._passwordHasher.hash(password);

    user.changePassword(HashedPassword.create(hashedPassword));

    await this._userRepo.save(user);
    this._logger.log({
      event: LOG_EVENTS.PASSWORD_RESET,
      context: 'ResetPasswordUseCase',
      userId: user.id,
    });
    await this._tokenBlacklistUseCase.execute(
      input.jwtToken,
      TOKEN_TYPE.RESET_PASSWORD_TOKEN,
    );

    return {
      status: 'success',
      message: 'Password changed successfully',
      data: {
        role: user.role,
      },
    };
  }
}
