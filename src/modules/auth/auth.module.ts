import { Module } from '@nestjs/common';
import { OtpService } from './application/ports/otp-service';
import { MailService } from './application/ports/mail-sevice';
import { OtpGenerator } from './infrastructure/otp/otp-service';
import { PasswordHasher } from './application/ports/password-hasher';
import { AuthController } from './presentation/controller/auth.controller';
import { UserRepository } from '../user/application/ports/user-repository';
import { NodemailerService } from './infrastructure/mail/nodemialer-service';
import { AuthCachedUserRepository } from './application/ports/user-cache-repository';
import { BcryptPasswordHasher } from './infrastructure/security/bcrypt-password-hasher';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: RegisterUserUsecase,
      useFactory: (
        otpService: OtpService,
        mailService: MailService,
        userRepo: UserRepository,
        passwordHasher: PasswordHasher,
        cacheRepo: AuthCachedUserRepository,
      ) => {
        return new RegisterUserUseCase(
          userRepo,
          cacheRepo,
          otpService,
          mailService,
          passwordHasher,
        );
      },
      inject: [],
    },
    {
      provide: 'PasswordHasher',
      useClass: BcryptPasswordHasher,
    },
    {
      provide: 'MailService',
      useClass: NodemailerService,
    },
    {
      provide: 'OtpService',
      useClass: OtpGenerator,
    },
    {},
    {},
  ],
})
export class AuthModule {}
