import { Module } from '@nestjs/common';
// import { AuthController } from './presentation/controller/auth.controller';

import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { UserModule } from '@/modules/user/user.module';

// import { authProviders } from './provider/auth.provider';
import { RegistrationController } from './presentation/controller/signup.controller';
import { signupProvider } from './provider/signup.provider';
import { OtpController } from './presentation/controller/otp.controller';
import { ResetPasswordController } from './presentation/controller/reset.password.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleAuthGuard } from './infrastructure';
import { GoogleAuthController } from './presentation/controller/google.auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './infrastructure';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { RefreshTokenSchema } from './infrastructure/schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenController } from './presentation/controller/refresh-token.controller';
import { infraProviders } from './provider/infra.providers';
import { otpProviders } from './provider/otp.providers';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RefreshToken',
        schema: RefreshTokenSchema,
      },
    ]),
    JwtModule.register({}),
    PassportModule,
    UserModule,
    RedisModule,
    AuthSecurityModule,
  ],
  controllers: [
    RegistrationController,
    OtpController,
    ResetPasswordController,
    GoogleAuthController,
    RefreshTokenController,
  ],
  providers: [
    ...infraProviders,
    ...otpProviders,
    ...signupProvider,
    GoogleStrategy,
    GoogleAuthGuard,
  ],
})
export class AuthModule {}
