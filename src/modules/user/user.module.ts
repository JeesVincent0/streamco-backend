import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './presentation/controller/user.controller';

import {
  BaseUserSchema,
  UserSchema,
  AdvertiserSchema,
} from './infrastructure/schemas';

import { userProviders } from './providers/user.providers';
import { USER_REPOSITORY_PORT } from './application';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { SharedModule } from '@/shared/shared.module';
import { StorageModule } from '@/shared/infrastructure/storage/storage.module';

// TOKENS
import {
  CREATE_ADVERTISER_USE_CASE_TOKEN,
  CREATE_USER_USE_CASE_TOKEN,
  CREATE_USER_WITH_GOOGLE_AUTH_USE_CASE_TOKEN,
} from './application/user.tokens';
import { AdminController } from './presentation/controller/admin.controller';
import { adminProvide } from './providers/admin.providers';

@Module({
  imports: [
    StorageModule,
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = BaseUserSchema;

          schema.discriminator('USER', UserSchema);
          schema.discriminator('ADVERTISER', AdvertiserSchema);

          return schema;
        },
      },
    ]),
    AuthSecurityModule,
    SharedModule,
  ],
  controllers: [UserController, AdminController],
  providers: [...userProviders, ...adminProvide],
  exports: [
    CREATE_USER_USE_CASE_TOKEN,
    CREATE_ADVERTISER_USE_CASE_TOKEN,
    CREATE_USER_WITH_GOOGLE_AUTH_USE_CASE_TOKEN,

    USER_REPOSITORY_PORT,
  ],
})
export class UserModule {}
