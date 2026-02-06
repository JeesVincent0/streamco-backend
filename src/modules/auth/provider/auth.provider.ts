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
// import { AdvertiserRegisterUseCase } from '../application/use-cases';

export const authProviders = [
  /**
   * Use case factory
   */

  // Use Case factory for - OTP verification
  {
    provide: OtpVerificationUseCase,
    useFactory: (
      authCachedUserRepository: AuthCachedUserRepository,
      userRepository: UserRepository,
    ) => {
      return new OtpVerificationUseCase(
        authCachedUserRepository,
        userRepository,
      );
    },
    inject: [AuthCachedUserRepository, UserRepository],
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
      logger: FileLogger,
    ) => {
      return new RegisterUserUseCase(
        userRepository,
        passwordHasher,
        otpService,
        mailService,
        authCachedUserRepository,
        logger,
      );
    },
    inject: [
      UserRepository,
      PasswordHasher,
      OtpService,
      MailService,
      AuthCachedUserRepository,
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
];
