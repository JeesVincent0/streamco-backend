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
  USER_REPOSITORY_PORT,
} from './application';

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
  ],
  controllers: [UserController],
  providers: [...userProviders],
  exports: [
    USER_REPOSITORY_PORT,
    CREATE_NORMAL_USER_PORT,
    CREATE_ADVERTISER_USER_PORT,
  ],
})
export class UserModule {}
