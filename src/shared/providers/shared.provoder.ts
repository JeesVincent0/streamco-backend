import {
  ICacheBaseRepo,
  GenerateOtpPort,
  IMailService,
  passwordHasherPort,
} from '../application/ports';
import {
  CACHE_BASE_REPO_PORT,
  GENERATE_OTP_INTERFACE,
  MAIL_SERVICE_PORT_TOKEN,
  PASSWORD_HASHER_PORT,
  RESEND_OTP_USE_CASE,
  SEND_OTP_USE_CASE,
  VERIFY_OTP_USE_CASE,
} from '../application/tokens';
import { SendOtpUseCase } from '../application/usecase/send-otp.usecase';
import { VerifyOtpUseCase, ResendOtpUsecae } from '../application/usecase';
import {
  BcryptPasswordHasherImpl,
  GenerateOtpImplCrypto,
  NodemailerService,
} from '../infrastructure';
import { RedisAuthCachedUserRepository } from '../infrastructure/cache/repositories/redis-auth-cached-user.repository';
import { FileLogger } from '../logger/file-logger';

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
      logger: FileLogger,
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
      FileLogger,
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
