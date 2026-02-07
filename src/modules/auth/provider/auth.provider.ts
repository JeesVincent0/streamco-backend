import { RegisterUserUseCase } from '../application/use-cases/user-register.usecase';

import { PasswordHasher } from '../application/ports/password-hasher';
import { MailService } from '../application/ports/mail-sevice';
import { OtpService } from '../application/ports/otp-service';
import { AuthCachedUserRepository } from '../application/ports/user-cache-repository';

import { BcryptPasswordHasher } from '../infrastructure/security/bcrypt-password-hasher';
import { NodemailerService } from '../infrastructure/mail/nodemialer-service';
import { OtpGenerator } from '../infrastructure/otp/otp-service';

import { RedisAuthCachedUserRepository } from '@/shared/infrastructure/cache/repositories/redis-auth-cached-user.repository';
import { UserRepository } from '@/modules/user/application/ports';
import { FileLogger } from '@/shared/logger/file-logger';
import { OtpVerificationUseCase } from '../application/use-cases/otp-verification.usecase';
import { IdGenerator } from '../application/ports';
import { CryptoIdGenerator } from '../infrastructure/otp/id-service';
import { GetOtpTimerUseCase, ResendOtpUseCase } from '../application/use-cases';

export const authProviders = [
  /**
   * Use case factory
   */

  // Use Case factory for - OTP verification
  {
    provide: ResendOtpUseCase,
    useFactory: (
      cachedRepository: AuthCachedUserRepository,
      otpService: OtpService,
      otpHasher: PasswordHasher,
      mailService: MailService,
    ) => {
      return new ResendOtpUseCase(
        cachedRepository,
        otpService,
        otpHasher,
        mailService,
      );
    },
    inject: [AuthCachedUserRepository, OtpService, PasswordHasher, MailService],
  },
  {
    provide: GetOtpTimerUseCase,
    useFactory: (cachedRepository: AuthCachedUserRepository) => {
      return new GetOtpTimerUseCase(cachedRepository);
    },
    inject: [AuthCachedUserRepository],
  },
  {
    provide: OtpVerificationUseCase,
    useFactory: (
      authCachedUserRepository: AuthCachedUserRepository,
      userRepository: UserRepository,
      passwordHasher: PasswordHasher,
    ) => {
      return new OtpVerificationUseCase(
        authCachedUserRepository,
        userRepository,
        passwordHasher,
      );
    },
    inject: [AuthCachedUserRepository, UserRepository, PasswordHasher],
  },

  // Use case factory for - Normal User registration
  {
    provide: RegisterUserUseCase,
    useFactory: (
      userRepository: UserRepository,
      passwordHasher: PasswordHasher,
      otpService: OtpService,
      mailService: MailService,
      authCachedUserRepository: AuthCachedUserRepository,
      randomIdGenerator: IdGenerator,
      logger: FileLogger,
    ) => {
      return new RegisterUserUseCase(
        userRepository,
        passwordHasher,
        otpService,
        mailService,
        authCachedUserRepository,
        randomIdGenerator,
        logger,
      );
    },
    inject: [
      UserRepository,
      PasswordHasher,
      OtpService,
      MailService,
      AuthCachedUserRepository,
      IdGenerator,
      FileLogger,
    ],
  },

  /**
   * Infrastructure bindings
   */
  {
    provide: PasswordHasher,
    useClass: BcryptPasswordHasher,
  },
  {
    provide: MailService,
    useClass: NodemailerService,
  },
  {
    provide: OtpService,
    useClass: OtpGenerator,
  },
  {
    provide: AuthCachedUserRepository,
    useClass: RedisAuthCachedUserRepository,
  },
  {
    provide: FileLogger,
    useClass: FileLogger,
  },
  {
    provide: IdGenerator,
    useClass: CryptoIdGenerator,
  },
];
