import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './presentation/controller/user.controller';

import {
  BaseUserSchema,
  UserSchema,
  AdvertiserSchema,
} from './infrastructure/schemas';

import { MongoRepository } from './infrastructure/repositories/user-repository.impl';
import { userProviders } from './providers/user.providers';
import {
  CREATE_ADVERTISER_USER_PORT,
  CREATE_NORMAL_USER_PORT,
  UserRepositoryPort,
} from './application';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
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
  providers: [
    ...userProviders,
    {
      provide: UserRepositoryPort,
      useClass: MongoRepository,
    },
  ],
  exports: [
    UserRepositoryPort,
    CREATE_NORMAL_USER_PORT,
    CREATE_ADVERTISER_USER_PORT,
  ],
})
export class UserModule {}
