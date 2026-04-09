import {
  IMailService,
  ICacheBaseRepo,
  GenerateOtpPort,
  passwordHasherPort,
} from '../application/ports';
import {
  SEND_OTP_USE_CASE,
  RESEND_OTP_USE_CASE,
  VERIFY_OTP_USE_CASE,
  CACHE_BASE_REPO_PORT,
  PASSWORD_HASHER_PORT,
  GENERATE_OTP_INTERFACE,
  MAIL_SERVICE_PORT_TOKEN,
} from '../application/tokens';

import {
  NodemailerService,
  GenerateOtpImplCrypto,
  BcryptPasswordHasherImpl,
} from '../infrastructure';

import { SendOtpUseCase } from '../application/usecase/send-otp.usecase';
import { VerifyOtpUseCase, ResendOtpUsecae } from '../application/usecase';
import { RedisAuthCachedUserRepository } from '../infrastructure/cache/repositories/redis-auth-cached-user.repository';
import { ILogger } from '../logger/logger.interface';
import { LOGGER_TOKEN } from '../logger';

export const sharedProvider = [
  {
    provide: VERIFY_OTP_USE_CASE,
    useFactory: (cacheRepo: ICacheBaseRepo, otpHasher: passwordHasherPort) => {
      return new VerifyOtpUseCase(cacheRepo, otpHasher);
    },
    inject: [CACHE_BASE_REPO_PORT, PASSWORD_HASHER_PORT],
  },

  {
    provide: SEND_OTP_USE_CASE,
    useFactory: (
      generateOtp: GenerateOtpPort,
      otpHasher: passwordHasherPort,
      cacheRepo: ICacheBaseRepo,
      sendOtp: IMailService,
    ) => {
      return new SendOtpUseCase(generateOtp, otpHasher, cacheRepo, sendOtp);
    },
    inject: [
      GENERATE_OTP_INTERFACE,
      PASSWORD_HASHER_PORT,
      CACHE_BASE_REPO_PORT,
      MAIL_SERVICE_PORT_TOKEN,
    ],
  },

  {
    provide: RESEND_OTP_USE_CASE,
    useFactory: (
      cacheRepo: ICacheBaseRepo,
      generateOtpPort: GenerateOtpPort,
      otpHasher: passwordHasherPort,
      mailService: IMailService,
      logger: ILogger,
    ) => {
      return new ResendOtpUsecae(
        cacheRepo,
        generateOtpPort,
        otpHasher,
        mailService,
        logger,
      );
    },
    inject: [
      CACHE_BASE_REPO_PORT,
      GENERATE_OTP_INTERFACE,
      PASSWORD_HASHER_PORT,
      MAIL_SERVICE_PORT_TOKEN,
      LOGGER_TOKEN,
    ],
  },

  {
    provide: GENERATE_OTP_INTERFACE,
    useClass: GenerateOtpImplCrypto,
  },

  {
    provide: PASSWORD_HASHER_PORT,
    useClass: BcryptPasswordHasherImpl,
  },

  {
    provide: CACHE_BASE_REPO_PORT,
    useClass: RedisAuthCachedUserRepository,
  },

  {
    provide: MAIL_SERVICE_PORT_TOKEN,
    useClass: NodemailerService,
  },
];
