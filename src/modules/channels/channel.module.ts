import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from './infrastructure/schema';
import {
  adminChannelProviders,
  channelProviders,
  userChannelProviders,
} from './provider';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { StorageModule } from '@/shared/infrastructure/storage/storage.module';
import {
  ChannelController,
  UserChannelController,
  AdminChannelController,
} from './presentation/controller';
import { ChannelOwnershipGuard } from './infrastructure/guards';
import { RedisModule } from '@/shared/infrastructure/cache/redis.module';

@Module({
  imports: [
    RedisModule,
    StorageModule,
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
  ],
  controllers: [
    ChannelController,
    UserChannelController,
    AdminChannelController,
  ],
  providers: [
    ChannelOwnershipGuard,
    ...channelProviders,
    ...userChannelProviders,
    ...adminChannelProviders,
  ],
})
export class ChannelModule {}
