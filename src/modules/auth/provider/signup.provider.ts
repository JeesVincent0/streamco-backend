import {
  CREATE_ADVERTISER_USER_PORT,
  CREATE_NORMAL_USER_PORT,
  CREATE_USER_WITH_GOOGLE_AUTH_PORT,
  CreateAdvertiserUserPort,
  CreateNormalUserPort,
  CreateUserWIthGoogleAuthPort,
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '@/modules/user/application';
import {
  ConfirmSignupUserUseCase,
  GenerateOtpUseCase,
  GoogleAuthUseCase,
  RefreshTokenUseCase,
  ResendOtpUseCase,
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
  TokenBlackListUseCase,
  VerifyOtpUseCase,
  VerifyResetPasswordOtpUseCase,
} from '../application/use-cases';
import {
  BcryptPasswordHasherImpl,
  NodemailerService,
  OtpGenerator,
} from '../infrastructure';
import {
  AUTH_CACHED_USER_REPOSITORY_PORT,
  BaseCachedUserRepositoryPort,
  MAIL_SERVICE,
  MailServicePort,
  OTP_SERVICE,
  OtpServicePort,
  PASSWORD_HASHER_PORT,
  PasswordHasherPort,
  REFRESH_TOKEN_REPOSITORY_PORT,
} from '../application';
import { RedisAuthCachedUserRepository } from '@/shared/infrastructure/cache/repositories/redis-auth-cached-user.repository';
import { ResetPasswordUseCase } from '../application/use-cases/reset-password/reset-password.usecase';
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
import { MonogodbRefreshTokenRepository } from '../infrastructure/repository';
import { RefreshTokenPort } from '../application/ports/token';
import { RefreshAccessTokenUseCase } from '../application/use-cases/token/refresh-accessp-token.usecase';

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
    provide: SignoutUseCase,
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
    provide: GoogleAuthUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      createUserWithGoogleAuth: CreateUserWIthGoogleAuthPort,
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
      CREATE_USER_WITH_GOOGLE_AUTH_PORT,
      GenerateTokenUseCase,
      FileLogger,
    ],
  },

  {
    provide: AdminSigninUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: PasswordHasherPort,
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
      PASSWORD_HASHER_PORT,
      GenerateTokenUseCase,
      FileLogger,
    ],
  },

  {
    provide: TokenBlackListUseCase,
    useFactory: (
      tokenBlacklistRepo: BaseCachedUserRepositoryPort,
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
    provide: SigninUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: PasswordHasherPort,
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
      PASSWORD_HASHER_PORT,
      GenerateTokenUseCase,
      FileLogger,
    ],
  },

  {
    provide: ResetPasswordUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: PasswordHasherPort,
      tokenBlacklist: TokenBlackListUseCase,
      logger: FileLogger,
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
      PASSWORD_HASHER_PORT,
      TokenBlackListUseCase,
      FileLogger,
    ],
  },

  {
    provide: VerifyResetPasswordOtpUseCase,
    useFactory: (
      verifyOtp: VerifyOtpUseCase,
      tokenService: TokenServicePort,
    ) => {
      return new VerifyResetPasswordOtpUseCase(verifyOtp, tokenService);
    },
    inject: [VerifyOtpUseCase, TOKEN_SERVICE],
  },

  {
    provide: SignupNormalUserUseCase,
    useFactory: (
      createNormalUser: CreateNormalUserPort,
      passwordHasher: PasswordHasherPort,
      generateOtpUseCase: GenerateOtpUseCase,
    ) => {
      return new SignupNormalUserUseCase(
        createNormalUser,
        passwordHasher,
        generateOtpUseCase,
      );
    },
    inject: [CREATE_NORMAL_USER_PORT, PASSWORD_HASHER_PORT, GenerateOtpUseCase],
  },

  {
    provide: ResendOtpUseCase,
    useFactory: (
      cachedRepo: BaseCachedUserRepositoryPort,
      otpService: OtpServicePort,
      otpHasher: PasswordHasherPort,
      mailService: MailServicePort,
      logger: FileLogger,
    ) => {
      return new ResendOtpUseCase(
        cachedRepo,
        otpService,
        otpHasher,
        mailService,
        logger,
      );
    },
    inject: [
      AUTH_CACHED_USER_REPOSITORY_PORT,
      OTP_SERVICE,
      PASSWORD_HASHER_PORT,
      MAIL_SERVICE,
      FileLogger,
    ],
  },

  {
    provide: GenerateOtpUseCase,
    useFactory: (
      otpService: OtpServicePort,
      userRepo: UserRepositoryPort,
      passwordHasher: PasswordHasherPort,
      cacheRepo: BaseCachedUserRepositoryPort,
      mailService: MailServicePort,
      logger: FileLogger,
    ) => {
      return new GenerateOtpUseCase(
        otpService,
        userRepo,
        passwordHasher,
        cacheRepo,
        mailService,
        logger,
      );
    },
    inject: [
      OTP_SERVICE,
      USER_REPOSITORY_PORT,
      PASSWORD_HASHER_PORT,
      AUTH_CACHED_USER_REPOSITORY_PORT,
      MAIL_SERVICE,
      FileLogger,
    ],
  },

  {
    provide: ConfirmSignupUserUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      verifyOtpUseCase: VerifyOtpUseCase,
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
      VerifyOtpUseCase,
      GenerateTokenUseCase,
      FileLogger,
    ],
  },

  {
    provide: VerifyOtpUseCase,
    useFactory: (
      cacheRepo: BaseCachedUserRepositoryPort,
      otpHasher: PasswordHasherPort,
    ) => {
      return new VerifyOtpUseCase(cacheRepo, otpHasher);
    },
    inject: [AUTH_CACHED_USER_REPOSITORY_PORT, PASSWORD_HASHER_PORT],
  },

  {
    provide: SignupAdvertiserUseCase,
    useFactory: (
      createAdvertiserUser: CreateAdvertiserUserPort,
      passwordHasher: PasswordHasherPort,
      generateOtp: GenerateOtpUseCase,
    ) => {
      return new SignupAdvertiserUseCase(
        createAdvertiserUser,
        passwordHasher,
        generateOtp,
      );
    },
    inject: [
      CREATE_ADVERTISER_USER_PORT,
      PASSWORD_HASHER_PORT,
      GenerateOtpUseCase,
    ],
  },

  {
    provide: PASSWORD_HASHER_PORT,
    useClass: BcryptPasswordHasherImpl,
  },

  {
    provide: OTP_SERVICE,
    useClass: OtpGenerator,
  },

  {
    provide: AUTH_CACHED_USER_REPOSITORY_PORT,
    useClass: RedisAuthCachedUserRepository,
  },

  {
    provide: MAIL_SERVICE,
    useClass: NodemailerService,
  },

  {
    provide: REFRESH_TOKEN_REPOSITORY_PORT,
    useClass: MonogodbRefreshTokenRepository,
  },
];
