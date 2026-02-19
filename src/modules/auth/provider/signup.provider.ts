import {
  CREATE_ADVERTISER_USER_PORT,
  CREATE_NORMAL_USER_PORT,
  CreateAdvertiserUserPort,
  CreateNormalUserPort,
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '@/modules/user/application';
import {
  ConfirmSignupUserUseCase,
  GenerateOtpUseCase,
  ResendOtpUseCase,
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
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
  TOKEN_SERVICE,
  TokenServicePort,
} from '../application';
import { RedisAuthCachedUserRepository } from '@/shared/infrastructure/cache/repositories/redis-auth-cached-user.repository';

export const signupProvider = [
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
    ) => {
      return new ConfirmSignupUserUseCase(userRepo, verifyOtpUseCase);
    },
    inject: [USER_REPOSITORY_PORT, VerifyOtpUseCase],
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
];
