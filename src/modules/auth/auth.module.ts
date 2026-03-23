import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@/modules/user/user.module';
import { RefreshTokenSchema } from './infrastructure/schema';
import { GoogleAuthGuard, GoogleStrategy } from './infrastructure';
import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { AuthSecurityModule } from '../auth-security/auth-security.module';

// Providers
import {
  otpProviders,
  infraProviders,
  signupProvider,
  resetPasswordProviders,
} from './provider';

// controllers
import {
  OtpController,
  GoogleAuthController,
  RefreshTokenController,
  RegistrationController,
  ResetPasswordController,
} from './presentation/controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'RefreshToken',
        schema: RefreshTokenSchema,
      },
    ]),
    JwtModule.register({}),
    UserModule,
    RedisModule,
    PassportModule,
    AuthSecurityModule,
  ],
  controllers: [
    OtpController,
    GoogleAuthController,
    RegistrationController,
    RefreshTokenController,
    ResetPasswordController,
  ],
  providers: [
    ...otpProviders,
    ...infraProviders,
    ...signupProvider,
    ...resetPasswordProviders,
    GoogleStrategy,
    GoogleAuthGuard,
  ],
})
export class AuthModule {}
