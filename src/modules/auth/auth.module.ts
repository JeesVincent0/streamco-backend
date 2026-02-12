import { Module } from '@nestjs/common';
// import { AuthController } from './presentation/controller/auth.controller';

import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { UserModule } from '@/modules/user/user.module';

// import { authProviders } from './provider/auth.provider';
import { RegistrationController } from './presentation/controller/signup.controller';
import { signupProvider } from './provider/signup.provider';
// import { OtpController } from './presentation/controller/otp.controller';

@Module({
  imports: [UserModule, RedisModule],
  controllers: [RegistrationController],
  providers: [...signupProvider],
})
export class AuthModule {}
