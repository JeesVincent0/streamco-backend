import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './presentation/controller/user.controller';

import {
  BaseUserSchema,
  UserSchema,
  AdvertiserSchema,
} from './infrastructure/schemas';

import { UserRepository } from './application/ports/user-repository';
import { MongoRepository } from './infrastructure/repositories/user-repository.impl';

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
  providers: [
    {
      provide: UserRepository,
      useClass: MongoRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
