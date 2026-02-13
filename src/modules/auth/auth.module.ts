import { forwardRef, Module } from '@nestjs/common';
// import { AuthController } from './presentation/controller/auth.controller';

import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { UserModule } from '@/modules/user/user.module';

// import { authProviders } from './provider/auth.provider';
import { RegistrationController } from './presentation/controller/signup.controller';
import { signupProvider } from './provider/signup.provider';
import { passwordHasherProvider } from './provider/password-hasher.provider';
import { PASSWORD_HASHER_PORT } from '@/modules/user/application';
// import { OtpController } from './presentation/controller/otp.controller';

@Module({
  imports: [forwardRef(() => UserModule), RedisModule],
  controllers: [RegistrationController],
  providers: [...signupProvider, ...passwordHasherProvider],
  exports: [PASSWORD_HASHER_PORT],
})
export class AuthModule {}
