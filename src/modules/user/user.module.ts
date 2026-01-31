import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './infrastructure/schemas/user-shema';
import { UserController } from './presentation/controller/user.controller';
import { BaseUserSchema } from './infrastructure/schemas/base-user.schema';
import { AdvertiserSchema } from './infrastructure/schemas/advertiser.schema';

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
})
export class UserModule {}
