import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controller/auth.controller';
import { RegisterUserUseCase } from './application/use-cases/user-register.usecase';

import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { UserModule } from '@/modules/user/user.module';

import { PasswordHasher } from './application/ports/password-hasher';
import { MailService } from './application/ports/mail-sevice';
import { OtpService } from './application/ports/otp-service';
import { AuthCachedUserRepository } from './application/ports/user-cache-repository';

import { BcryptPasswordHasher } from './infrastructure/security/bcrypt-password-hasher';
import { NodemailerService } from './infrastructure/mail/nodemialer-service';
import { OtpGenerator } from './infrastructure/otp/otp-service';
import { RedisAuthCachedUserRepository } from '@/shared/infrastructure/cache/repositories/redis-auth-cached-user.repository';

@Module({
  imports: [UserModule, RedisModule],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,

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
  ],
})
export class AuthModule {}
