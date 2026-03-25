import {
  ICreateAdvertiserUserUseCase,
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
  ICreateNormalUserUseCase,
  ICreateUserWithGoogleAuthUseCase,
} from '@/modules/user/application';
import {
  ConfirmSignupUserUseCase,
  GoogleAuthUseCase,
  RefreshTokenUseCase,
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
  TokenBlackListUseCase,
} from '../application/use-cases';

import {
  PASSWORD_HASHER_PORT_TOKEN,
  IPasswordHasher,
  REFRESH_TOKEN_REPOSITORY_PORT,
  GENERATE_OTP_USE_CASE_TOKEN,
  VERIFY_OTP_USE_CASE_TOKEN,
  IVerifyOtpUseCase,
  GOOGLE_AUTH_USE_CASE_TOKEN,
  CONFIRM_SIGNUP_USE_CASE_TOKEN,
  SIGNOUT_USE_CASE_TOKEN,
  SIGNUP_ADVERTISER_USE_CASE_TOKEN,
  SIGNUP_NORMAL_USER_USE_CASE_TOKEN,
  ADMIN_SIGNIN_USE_CASE_TOKEN,
  SIGNIN_USE_CASE_TOKEN,
  REFRESH_ACCESS_TOKEN_USE_CASE_TOKEN,
  IRefreshTokenUseCase,
  REFRESH_TOKEN_USE_CASE_TOKEN,
  TOKEN_BLACK_LIST_USE_CASE_TOKEN,
  IGenerateOtpUseCase,
  GENERATE_TOKEN_OTP_USE_CASE_TOKEN,
} from '../application';
import { SigninUseCase } from '../application/use-cases/signin';
import { AdminSigninUseCase } from '../application/use-cases/signin/admin-signin-usecase';
import { SignoutUseCase } from '../application/use-cases/signup/signout.usecase';
import {
  BLACKLIST_TOKEN_CACKE,
  TOKEN_SERVICE,
} from '@/modules/auth-security/application/tokens';
import { TokenServicePort } from '@/modules/auth-security/application/ports';
import { FileLogger } from '@/shared/logger/file-logger';
import { GenerateTokenUseCase } from '../application/use-cases/token/generate-token.usecase';
import { RefreshTokenPort } from '../application/ports/token';
import { RefreshAccessTokenUseCase } from '../application/use-cases/token/refresh-access-token.usecase';
import { ICacheBaseRepo } from '@/shared/application/ports';

// user module tokens
import {
  CREATE_ADVERTISER_USE_CASE_TOKEN,
  CREATE_USER_USE_CASE_TOKEN,
  CREATE_USER_WITH_GOOGLE_AUTH_USE_CASE_TOKEN,
} from '@/modules/user/application/user.tokens';
import { IGenerateTokenUseCase } from '../application/ports/usecase/generate-token.usecase.port';

export const signupProvider = [
  {
    provide: REFRESH_ACCESS_TOKEN_USE_CASE_TOKEN,
    useFactory: (
      tokenService: TokenServicePort,
      userRepo: UserRepositoryPort,
    ) => {
      return new RefreshAccessTokenUseCase(tokenService, userRepo);
    },
    inject: [TOKEN_SERVICE, USER_REPOSITORY_PORT],
  },
  {
    provide: SIGNOUT_USE_CASE_TOKEN,
    useFactory: (
      refreshTokenUseCase: IRefreshTokenUseCase,
      logger: FileLogger,
    ) => {
      return new SignoutUseCase(refreshTokenUseCase, logger);
    },
    inject: [REFRESH_TOKEN_USE_CASE_TOKEN, FileLogger],
  },

  {
    provide: REFRESH_TOKEN_USE_CASE_TOKEN,
    useFactory: (
      refreshTokenRepository: RefreshTokenPort,
      tokenService: TokenServicePort,
      logger: FileLogger,
    ) => {
      return new RefreshTokenUseCase(
        refreshTokenRepository,
        tokenService,
        logger,
      );
    },
    inject: [REFRESH_TOKEN_REPOSITORY_PORT, TOKEN_SERVICE, FileLogger],
  },

  {
    provide: GENERATE_TOKEN_OTP_USE_CASE_TOKEN,
    useFactory: (
      tokenService: TokenServicePort,
      refreshTokenUseCase: IRefreshTokenUseCase,
      logger: FileLogger,
    ) => {
      return new GenerateTokenUseCase(
        tokenService,
        refreshTokenUseCase,
        logger,
      );
    },
    inject: [TOKEN_SERVICE, REFRESH_TOKEN_USE_CASE_TOKEN, FileLogger],
  },

  {
    provide: GOOGLE_AUTH_USE_CASE_TOKEN,
    useFactory: (
      userRepo: UserRepositoryPort,
      createUserWithGoogleAuth: ICreateUserWithGoogleAuthUseCase,
      generateTokenUseCase: IGenerateTokenUseCase,
      logger: FileLogger,
    ) => {
      return new GoogleAuthUseCase(
        userRepo,
        createUserWithGoogleAuth,
        generateTokenUseCase,
        logger,
      );
    },
    inject: [
      USER_REPOSITORY_PORT,
      CREATE_USER_WITH_GOOGLE_AUTH_USE_CASE_TOKEN,
      GENERATE_OTP_USE_CASE_TOKEN,
      FileLogger,
    ],
  },

  {
    provide: ADMIN_SIGNIN_USE_CASE_TOKEN,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: IPasswordHasher,
      generateTokenUseCase: IGenerateTokenUseCase,
      logger: FileLogger,
    ) => {
      return new AdminSigninUseCase(
        userRepo,
        passwordHasher,
        generateTokenUseCase,
        logger,
      );
    },
    inject: [
      USER_REPOSITORY_PORT,
      PASSWORD_HASHER_PORT_TOKEN,
      GENERATE_TOKEN_OTP_USE_CASE_TOKEN,
      FileLogger,
    ],
  },

  {
    provide: TOKEN_BLACK_LIST_USE_CASE_TOKEN,
    useFactory: (
      tokenBlacklistRepo: ICacheBaseRepo,
      tokenService: TokenServicePort,
      logger: FileLogger,
    ) => {
      return new TokenBlackListUseCase(
        tokenBlacklistRepo,
        tokenService,
        logger,
      );
    },
    inject: [BLACKLIST_TOKEN_CACKE, TOKEN_SERVICE, FileLogger],
  },

  {
    provide: SIGNIN_USE_CASE_TOKEN,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: IPasswordHasher,
      generateTokenUseCase: IGenerateTokenUseCase,
      logger: FileLogger,
    ) => {
      return new SigninUseCase(
        userRepo,
        passwordHasher,
        generateTokenUseCase,
        logger,
      );
    },
    inject: [
      USER_REPOSITORY_PORT,
      PASSWORD_HASHER_PORT_TOKEN,
      GENERATE_TOKEN_OTP_USE_CASE_TOKEN,
      FileLogger,
    ],
  },

  {
    provide: SIGNUP_NORMAL_USER_USE_CASE_TOKEN,
    useFactory: (
      createNormalUser: ICreateNormalUserUseCase,
      passwordHasher: IPasswordHasher,
      generateOtpUseCase: IGenerateOtpUseCase,
    ) => {
      return new SignupNormalUserUseCase(
        createNormalUser,
        passwordHasher,
        generateOtpUseCase,
      );
    },
    inject: [
      CREATE_USER_USE_CASE_TOKEN,
      PASSWORD_HASHER_PORT_TOKEN,
      GENERATE_OTP_USE_CASE_TOKEN,
    ],
  },

  {
    provide: CONFIRM_SIGNUP_USE_CASE_TOKEN,
    useFactory: (
      userRepo: UserRepositoryPort,
      verifyOtpUseCase: IVerifyOtpUseCase,
      generateTokenUseCase: IGenerateTokenUseCase,
      logger: FileLogger,
    ) => {
      return new ConfirmSignupUserUseCase(
        userRepo,
        verifyOtpUseCase,
        generateTokenUseCase,
        logger,
      );
    },
    inject: [
      USER_REPOSITORY_PORT,
      VERIFY_OTP_USE_CASE_TOKEN,
      GENERATE_TOKEN_OTP_USE_CASE_TOKEN,
      FileLogger,
    ],
  },

  {
    provide: SIGNUP_ADVERTISER_USE_CASE_TOKEN,
    useFactory: (
      createAdvertiserUser: ICreateAdvertiserUserUseCase,
      passwordHasher: IPasswordHasher,
      generateOtp: IGenerateOtpUseCase,
    ) => {
      return new SignupAdvertiserUseCase(
        createAdvertiserUser,
        passwordHasher,
        generateOtp,
      );
    },
    inject: [
      CREATE_ADVERTISER_USE_CASE_TOKEN,
      PASSWORD_HASHER_PORT_TOKEN,
      GENERATE_OTP_USE_CASE_TOKEN,
    ],
  },
];
