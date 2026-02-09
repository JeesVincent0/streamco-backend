import { Module } from '@nestjs/common';
import { AuthController } from './presentation/controller/auth.controller';

import { RedisModule } from '@/shared/infrastructure/cache/redis.module';
import { UserModule } from '@/modules/user/user.module';

import { authProviders } from './provider/auth.provider';
import { RegistrationController } from './presentation/controller/registration.controller';

@Module({
  imports: [UserModule, RedisModule],
  controllers: [AuthController, RegistrationController],
  providers: [...authProviders],
})
export class AuthModule {}
