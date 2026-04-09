import {
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '@/modules/user/application';
import {
  // interfaces
  IMailService,
  IOtpService,
  IPasswordHasher,

  // concrete usecase methods
  VerifyOtpUseCase,
  ResendOtpUseCase,
  GenerateOtpUseCase,

  // tokens
  OTP_SERVICE_TOKEN,
  MAIL_SERVICE_PORT_TOKEN,
  RESEND_OTP_USE_CASE_TOKEN,
  PASSWORD_HASHER_PORT_TOKEN,
  GENERATE_OTP_USE_CASE_TOKEN,
  AUTH_CACHED_USER_REPOSITORY_PORT_TOKEN,
  VERIFY_OTP_USE_CASE_TOKEN,
} from '../application';
import { ICacheBaseRepo } from '@/shared/application/ports';
import { ILogger } from '@/shared/logger/logger.interface';
import { LOGGER_TOKEN } from '@/shared/logger';

export const otpProviders = [
  {
    provide: GENERATE_OTP_USE_CASE_TOKEN,
    useFactory: (
      otpService: IOtpService,
      userRepo: UserRepositoryPort,
      passwordHasher: IPasswordHasher,
      cacheRepo: ICacheBaseRepo,
      mailService: IMailService,
      logger: ILogger,
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
      OTP_SERVICE_TOKEN,
      USER_REPOSITORY_PORT,
      PASSWORD_HASHER_PORT_TOKEN,
      AUTH_CACHED_USER_REPOSITORY_PORT_TOKEN,
      MAIL_SERVICE_PORT_TOKEN,
      LOGGER_TOKEN,
    ],
  },

  {
    provide: RESEND_OTP_USE_CASE_TOKEN,
    useFactory: (
      cachedRepo: ICacheBaseRepo,
      otpService: IOtpService,
      otpHasher: IPasswordHasher,
      mailService: IMailService,
      logger: ILogger,
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
      AUTH_CACHED_USER_REPOSITORY_PORT_TOKEN,
      OTP_SERVICE_TOKEN,
      PASSWORD_HASHER_PORT_TOKEN,
      MAIL_SERVICE_PORT_TOKEN,
      LOGGER_TOKEN,
    ],
  },

  {
    provide: VERIFY_OTP_USE_CASE_TOKEN,
    useFactory: (cacheRepo: ICacheBaseRepo, otpHasher: IPasswordHasher) => {
      return new VerifyOtpUseCase(cacheRepo, otpHasher);
    },
    inject: [
      AUTH_CACHED_USER_REPOSITORY_PORT_TOKEN,
      PASSWORD_HASHER_PORT_TOKEN,
    ],
  },
];
