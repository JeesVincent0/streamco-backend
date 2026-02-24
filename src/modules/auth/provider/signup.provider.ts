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
  TOKEN_BLACK_LIST_CACHE,
  TOKEN_SERVICE,
  TokenServicePort,
} from '../application';
import { RedisAuthCachedUserRepository } from '@/shared/infrastructure/cache/repositories/redis-auth-cached-user.repository';
import { ResetPasswordUseCase } from '../application/use-cases/reset-password/reset-password.usecase';
import { SigninUseCase } from '../application/use-cases/signin';
import { RedisTokenBlackListRepository } from '../infrastructure/cache';
import { AdminSigninUseCase } from '../application/use-cases/signin/admin-signin-usecase';

export const signupProvider = [
  {
    provide: GoogleAuthUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      createUserWithGoogleAuth: CreateUserWIthGoogleAuthPort,
      tokenService: TokenServicePort,
    ) => {
      return new GoogleAuthUseCase(
        userRepo,
        createUserWithGoogleAuth,
        tokenService,
      );
    },
    inject: [
      USER_REPOSITORY_PORT,
      CREATE_USER_WITH_GOOGLE_AUTH_PORT,
      TOKEN_SERVICE,
    ],
  },

  {
    provide: AdminSigninUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: PasswordHasherPort,
      tokenService: TokenServicePort,
    ) => {
      return new AdminSigninUseCase(userRepo, passwordHasher, tokenService);
    },
    inject: [USER_REPOSITORY_PORT, PASSWORD_HASHER_PORT, TOKEN_SERVICE],
  },

  {
    provide: TokenBlackListUseCase,
    useFactory: (
      tokenBlacklistRepo: BaseCachedUserRepositoryPort,
      tokenService: TokenServicePort,
    ) => {
      return new TokenBlackListUseCase(tokenBlacklistRepo, tokenService);
    },
    inject: [TOKEN_BLACK_LIST_CACHE, TOKEN_SERVICE],
  },

  {
    provide: SigninUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: PasswordHasherPort,
      tokenService: TokenServicePort,
    ) => {
      return new SigninUseCase(userRepo, passwordHasher, tokenService);
    },
    inject: [USER_REPOSITORY_PORT, PASSWORD_HASHER_PORT, TOKEN_SERVICE],
  },

  {
    provide: ResetPasswordUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      passwordHasher: PasswordHasherPort,
      tokenBlacklist: TokenBlackListUseCase,
    ) => {
      return new ResetPasswordUseCase(userRepo, passwordHasher, tokenBlacklist);
    },
    inject: [USER_REPOSITORY_PORT, PASSWORD_HASHER_PORT, TokenBlackListUseCase],
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
    ) => {
      return new ResendOtpUseCase(
        cachedRepo,
        otpService,
        otpHasher,
        mailService,
      );
    },
    inject: [
      AUTH_CACHED_USER_REPOSITORY_PORT,
      OTP_SERVICE,
      PASSWORD_HASHER_PORT,
      MAIL_SERVICE,
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
    ) => {
      return new GenerateOtpUseCase(
        otpService,
        userRepo,
        passwordHasher,
        cacheRepo,
        mailService,
      );
    },
    inject: [
      OTP_SERVICE,
      USER_REPOSITORY_PORT,
      PASSWORD_HASHER_PORT,
      AUTH_CACHED_USER_REPOSITORY_PORT,
      MAIL_SERVICE,
    ],
  },

  {
    provide: ConfirmSignupUserUseCase,
    useFactory: (
      userRepo: UserRepositoryPort,
      verifyOtpUseCase: VerifyOtpUseCase,
      tokenService: TokenServicePort,
    ) => {
      return new ConfirmSignupUserUseCase(
        userRepo,
        verifyOtpUseCase,
        tokenService,
      );
    },
    inject: [USER_REPOSITORY_PORT, VerifyOtpUseCase, TOKEN_SERVICE],
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
    provide: TOKEN_BLACK_LIST_CACHE,
    useClass: RedisTokenBlackListRepository,
  },
];
