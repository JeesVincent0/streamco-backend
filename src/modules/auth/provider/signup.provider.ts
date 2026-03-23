import {
  ICreateAdvertiserUserUseCase,
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
  ICreateNormalUserUseCase,
  ICreateUserWithGoogleAuthUseCase,
} from '@/modules/user/application';
import {
  ConfirmSignupUserUseCase,
  GenerateOtpUseCase,
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
import { RefreshAccessTokenUseCase } from '../application/use-cases/token/refresh-accessp-token.usecase';
import { ICacheBaseRepo } from '@/shared/application/ports';

// user module tokens
import {
  CREATE_ADVERTISER_USE_CASE_TOKEN,
  CREATE_USER_USE_CASE_TOKEN,
  CREATE_USER_WITH_GOOGLE_AUTH_USE_CASE_TOKEN,
} from '@/modules/user/application/user.tokens';

export const signupProvider = [
  {
    provide: RefreshAccessTokenUseCase,
    useFactory: (
      tokenService: TokenServicePort,
      userRepo: UserRepositoryPort,
      logger: FileLogger,
    ) => {
      return new RefreshAccessTokenUseCase(tokenService, userRepo, logger);
    },
    inject: [TOKEN_SERVICE, USER_REPOSITORY_PORT, FileLogger],
  },
  {
    provide: SIGNOUT_USE_CASE_TOKEN,
    useFactory: (
      refreshTokenUseCase: RefreshTokenUseCase,
      logger: FileLogger,
    ) => {
      return new SignoutUseCase(refreshTokenUseCase, logger);
    },
    inject: [RefreshTokenUseCase, FileLogger],
  },

  {
    provide: RefreshTokenUseCase,
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
    provide: GenerateTokenUseCase,
    useFactory: (
      tokenService: TokenServicePort,
      refreshTokenUseCase: RefreshTokenUseCase,
      logger: FileLogger,
    ) => {
      return new GenerateTokenUseCase(
        tokenService,
        refreshTokenUseCase,
        logger,
      );
    },
    inject: [TOKEN_SERVICE, RefreshTokenUseCase, FileLogger],
  },

  {
    provide: GOOGLE_AUTH_USE_CASE_TOKEN,
    useFactory: (
      userRepo: UserRepositoryPort,
      createUserWithGoogleAuth: ICreateUserWithGoogleAuthUseCase,
      generateTokenUseCase: GenerateTokenUseCase,
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
      GenerateTokenUseCase,
      FileLogger,
    ],
  },

  {
    provide: ADMIN_SIGNIN_USE_CASE_TOKEN,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: IPasswordHasher,
      generateTokenUseCase: GenerateTokenUseCase,
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
      GenerateTokenUseCase,
      FileLogger,
    ],
  },

  {
    provide: TokenBlackListUseCase,
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
      generateTokenUseCase: GenerateTokenUseCase,
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
      GenerateTokenUseCase,
      FileLogger,
    ],
  },

  {
    provide: SIGNUP_NORMAL_USER_USE_CASE_TOKEN,
    useFactory: (
      createNormalUser: ICreateNormalUserUseCase,
      passwordHasher: IPasswordHasher,
      generateOtpUseCase: GenerateOtpUseCase,
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
      generateTokenUseCase: GenerateTokenUseCase,
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
      GenerateTokenUseCase,
      FileLogger,
    ],
  },

  {
    provide: SIGNUP_ADVERTISER_USE_CASE_TOKEN,
    useFactory: (
      createAdvertiserUser: ICreateAdvertiserUserUseCase,
      passwordHasher: IPasswordHasher,
      generateOtp: GenerateOtpUseCase,
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
