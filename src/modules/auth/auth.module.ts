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
import {
  AccessTokenGuard,
  GoogleAuthGuard,
  RefreshTokenGuard,
} from './infrastructure/guards';
import { GoogleAuthController } from './presentation/controller/google.auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './infrastructure';

@Module({
  imports: [JwtModule.register({}), PassportModule, UserModule, RedisModule],
  controllers: [
    RegistrationController,
    OtpController,
    ResetPasswordController,
    GoogleAuthController,
  ],
  providers: [
    ...signupProvider,
    ...tokenProviders,
    GoogleStrategy,
    GoogleAuthGuard,
  ],
  exports: [TOKEN_SERVICE, AccessTokenGuard, RefreshTokenGuard],
})
export class AuthModule {}
