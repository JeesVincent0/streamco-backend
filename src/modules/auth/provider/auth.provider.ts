import { RegisterUserUseCase } from '../application/use-cases/registration/user-register.usecase';

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
import { SigninUseCase } from '../application/use-cases/user-signin.usecase';
import { GenerateOtpUseCase } from '../application/use-cases/otp/generate-otp.usecase';
import { VerifyOtpUseCase } from '../application/use-cases/otp/verify-otp.usecase';
import { ConfirmRegistrationUseCase } from '../application/use-cases/registration/confirm-registration.usecase';

export const authProviders = [
  /**
   * Use case factory
   */

  // Use Case factory for - OTP verification
  {
    provide: ConfirmRegistrationUseCase,
    useFactory: (
      userRepository: UserRepository,
      verifyOtpUseCase: VerifyOtpUseCase,
    ) => {
      return new ConfirmRegistrationUseCase(userRepository, verifyOtpUseCase);
    },
    inject: [UserRepository, VerifyOtpUseCase],
  },
  {
    provide: VerifyOtpUseCase,
    useFactory: (
      authCachedUserRepository: AuthCachedUserRepository,
      otpHasher: PasswordHasher,
    ) => {
      return new VerifyOtpUseCase(authCachedUserRepository, otpHasher);
    },
    inject: [AuthCachedUserRepository, PasswordHasher],
  },

  {
    provide: GenerateOtpUseCase,
    useFactory: (
      otpRepository: OtpService,
      userRepository: UserRepository,
      passwordHasher: PasswordHasher,
      cacheRepository: AuthCachedUserRepository,
      mailService: MailService,
    ) => {
      return new GenerateOtpUseCase(
        otpRepository,
        userRepository,
        passwordHasher,
        cacheRepository,
        mailService,
      );
    },
    inject: [
      OtpService,
      UserRepository,
      PasswordHasher,
      AuthCachedUserRepository,
      MailService,
    ],
  },

  {
    provide: SigninUseCase,
    useFactory: (
      userRepository: UserRepository,
      passwordHasher: PasswordHasher,
    ) => {
      return new SigninUseCase(userRepository, passwordHasher);
    },
    inject: [UserRepository, PasswordHasher],
  },
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
      generateOtpUseCase: GenerateOtpUseCase,
      userRepository: UserRepository,
      passwordHasher: PasswordHasher,
    ) => {
      return new RegisterUserUseCase(
        generateOtpUseCase,
        userRepository,
        passwordHasher,
      );
    },
    inject: [GenerateOtpUseCase, UserRepository, PasswordHasher],
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
