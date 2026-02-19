import { Module } from '@nestjs/common';
// import { AuthController } from './presentation/controller/auth.controller';

import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { UserModule } from '@/modules/user/user.module';

// import { authProviders } from './provider/auth.provider';
import { RegistrationController } from './presentation/controller/signup.controller';
import { signupProvider } from './provider/signup.provider';
import { OtpController } from './presentation/controller/otp.controller';
import { ResetPasswordController } from './presentation/controller/reset.password.controller';
import { tokenProviders } from './provider/token.provider';
import { JwtModule } from '@nestjs/jwt';
import { TOKEN_SERVICE } from './application';
import { AccessTokenGuard, RefreshTokenGuard } from './infrastructure/guards';

@Module({
  imports: [JwtModule.register({}), UserModule, RedisModule],
  controllers: [RegistrationController, OtpController, ResetPasswordController],
  providers: [...signupProvider, ...tokenProviders],
  exports: [TOKEN_SERVICE, AccessTokenGuard, RefreshTokenGuard],
})
export class AuthModule {}
