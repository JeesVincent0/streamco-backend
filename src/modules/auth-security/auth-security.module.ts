import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { tokenProviders } from './providers';
import { AccessTokenGuard, RefreshTokenGuard } from './presentation';
import { ResetPasswordTokenGuard } from './presentation/guards/reset-password.guard';
import { BLACKLIST_TOKEN_CACKE, TOKEN_SERVICE } from './application/tokens';

@Module({
  imports: [JwtModule, RedisModule],
  providers: [...tokenProviders],
  exports: [
    AccessTokenGuard,
    RefreshTokenGuard,
    ResetPasswordTokenGuard,
    TOKEN_SERVICE,
    BLACKLIST_TOKEN_CACKE,
  ],
})
export class AuthSecurityModule {}
