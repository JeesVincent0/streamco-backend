import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './presentation/controller/user.controller';

import {
  BaseUserSchema,
  UserSchema,
  AdvertiserSchema,
} from './infrastructure/schemas';

import { userProviders } from './providers/user.providers';
import {
  CREATE_ADVERTISER_USER_PORT,
  CREATE_NORMAL_USER_PORT,
  CREATE_USER_WITH_GOOGLE_AUTH_PORT,
  GET_ALL_USERS_PORT,
  USER_REPOSITORY_PORT,
} from './application';
import { AuthSecurityModule } from '../auth-security/auth-security.module';

@Module({
  imports: [
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
  ],
  controllers: [UserController],
  providers: [...userProviders],
  exports: [
    USER_REPOSITORY_PORT,
    GET_ALL_USERS_PORT,
    CREATE_NORMAL_USER_PORT,
    CREATE_ADVERTISER_USER_PORT,
    CREATE_USER_WITH_GOOGLE_AUTH_PORT,
  ],
})
export class UserModule {}
