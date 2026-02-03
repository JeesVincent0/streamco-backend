import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controller/auth.controller';

import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { UserModule } from '@/modules/user/user.module';

import { authProviders } from './provider/auth.provider';

@Module({
  imports: [UserModule, RedisModule],
  controllers: [AuthController],
  providers: [...authProviders],
})
export class AuthModule {}
