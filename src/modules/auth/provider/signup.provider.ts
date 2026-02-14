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
  SignupAdvertiserUseCase,
  SignupNormalUserUseCase,
  VerifyOtpUseCase,
} from '../application/use-cases';
import {
  BcryptPasswordHasherImpl,
  NodemailerService,
  OtpGenerator,
} from '../infrastructure';
import {
  AUTH_CACHED_USER_REPOSITORY_PORT,
  AuthCachedUserRepositoryPort,
  MAIL_SERVICE,
  MailServicePort,
  OTP_SERVICE,
  OtpServicePort,
  PASSWORD_HASHER_PORT,
  PasswordHasherPort,
} from '../application';
import {
  GENERATE_OTP_USE_CASE,
  VERIFY_OTP_USE_CASE,
} from '../application/use-cases/tokens.usecase';
import { RedisAuthCachedUserRepository } from '@/shared/infrastructure/cache/repositories/redis-auth-cached-user.repository';

export const signupProvider = [
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
    inject: [
      CREATE_NORMAL_USER_PORT,
      PASSWORD_HASHER_PORT,
      GENERATE_OTP_USE_CASE,
    ],
  },

  {
    provide: GENERATE_OTP_USE_CASE,
    useFactory: (
      otpService: OtpServicePort,
      userRepo: UserRepositoryPort,
      passwordHasher: PasswordHasherPort,
      cacheRepo: AuthCachedUserRepositoryPort,
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
    inject: [USER_REPOSITORY_PORT, VERIFY_OTP_USE_CASE],
  },

  {
    provide: VERIFY_OTP_USE_CASE,
    useFactory: (
      cacheRepo: AuthCachedUserRepositoryPort,
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
      GENERATE_OTP_USE_CASE,
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
