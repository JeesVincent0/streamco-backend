import { UserRepositoryPort } from '@/modules/user/application';
import { SigninInput } from '../../inputs';
import { Email, Password, UserRole } from '@/modules/user/domain';
import { BadRequestError } from '@/shared/errors';
import { ERROR_MESSAGES } from '@/shared/constants/error-messages';
import { PasswordHasherPort, TokenServicePort } from '../../ports';
import { TokenPayload } from '@/modules/auth/domain';

export class AdminSigninUseCase {
  constructor(
    private readonly _userRepo: UserRepositoryPort,
    private readonly _passwordHashser: PasswordHasherPort,
    private readonly _tokenService: TokenServicePort,
  ) {}
  async execute(input: SigninInput) {
    const email = Email.create(input.email);
    const password = Password.create(input.password);

    const user = await this._userRepo.findByEmail(email);
    if (!user || !user.password) {
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    user.assertIsAdmin();

    const isPasswordMatch = await this._passwordHashser.compare(
      password,
      user.password.getValue(),
    );

    if (!isPasswordMatch) {
      throw new BadRequestError(ERROR_MESSAGES.INCORRECT_CREDENTIALS);
    }

    if (!process.env.JWT_ISSUER || !process.env.JWT_AUDIENCE) {
      throw new Error(ERROR_MESSAGES.ENV_FILE_NOT_ATTACHED);
    }

    const accessPayload = TokenPayload.generateAccessPayload(
      user.id,
      UserRole.ADMIN,
      'admin:read admin:write',
    );
    const refreshPayload = TokenPayload.generateRefreshPayload(user.id);

    const accessToken =
      await this._tokenService.generateAccessToken(accessPayload);
    const refreshToken =
      await this._tokenService.generateRefreshToken(refreshPayload);

    return { accessToken, refreshToken };
  }
}
