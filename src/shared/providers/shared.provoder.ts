import {
  CacheBaseRepoPort,
  GenerateOtpPort,
  MailServicePort,
  passwordHasherPort,
} from '../application/ports';
import {
  CACHE_BASE_REPO_PORT,
  GENERATE_OTP_INTERFACE,
  MAIL_SERVICE_PORT,
  PASSWORD_HASHER_PORT,
  SEND_OTP_USE_CASE,
} from '../application/tokens';
import { SendOtpUseCase } from '../application/usecase/send-otp.usecase';
import {
  BcryptPasswordHasherImpl,
  GenerateOtpImplCrypto,
  NodemailerService,
} from '../infrastructure';
import { RedisAuthCachedUserRepository } from '../infrastructure/cache/repositories/redis-auth-cached-user.repository';

export const sharedProvider = [
  {
    provide: SEND_OTP_USE_CASE,
    useFactory: (
      generateOtp: GenerateOtpPort,
      otpHasher: passwordHasherPort,
      cacheRepo: CacheBaseRepoPort,
      sendOtp: MailServicePort,
    ) => {
      return new SendOtpUseCase(generateOtp, otpHasher, cacheRepo, sendOtp);
    },
    inject: [
      GENERATE_OTP_INTERFACE,
      PASSWORD_HASHER_PORT,
      CACHE_BASE_REPO_PORT,
      MAIL_SERVICE_PORT,
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
    provide: MAIL_SERVICE_PORT,
    useClass: NodemailerService,
  },
];
