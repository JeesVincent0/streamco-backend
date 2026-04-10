import {
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '@/modules/user/application';

import {
  IPasswordHasher,

  // usecases
  ResetPasswordUseCase,

  // tokens
  PASSWORD_HASHER_PORT_TOKEN,
  RESET_PASSWORD_USE_CASE_TOKEN,
  VERIFY_RESET_PASSWORD_OTP_USE_CASE_TOKEN,
  IVerifyOtpUseCase,
  VerifyResetPasswordOtpUseCase,
  VERIFY_OTP_USE_CASE_TOKEN,
  ITokenBlackListUseCase,
  TOKEN_BLACK_LIST_USE_CASE_TOKEN,
} from '../application';

import { TokenServicePort } from '@/modules/auth-security/application';
import { TOKEN_SERVICE } from '@/modules/auth-security/application/tokens';
import { ILogger } from '@/shared/logger/logger.interface';
import { LOGGER_TOKEN } from '@/shared/logger';

export const resetPasswordProviders = [
  {
    provide: RESET_PASSWORD_USE_CASE_TOKEN,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: IPasswordHasher,
      tokenBlacklist: ITokenBlackListUseCase,
      logger: ILogger,
    ) => {
      return new ResetPasswordUseCase(
        userRepo,
        passwordHasher,
        tokenBlacklist,
        logger,
      );
    },
    inject: [
      USER_REPOSITORY_PORT,
      PASSWORD_HASHER_PORT_TOKEN,
      TOKEN_BLACK_LIST_USE_CASE_TOKEN,
      LOGGER_TOKEN,
    ],
  },
  {
    provide: VERIFY_RESET_PASSWORD_OTP_USE_CASE_TOKEN,
    useFactory: (
      verifyOtp: IVerifyOtpUseCase,
      tokenService: TokenServicePort,
    ) => {
      return new VerifyResetPasswordOtpUseCase(verifyOtp, tokenService);
    },
    inject: [VERIFY_OTP_USE_CASE_TOKEN, TOKEN_SERVICE],
  },
];
