import {
  ChannelLiveController,
  AdvertiserLiveController,
} from './presentation/controllers';

import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LiveSchema } from './infrastructure/schema';
import { ChannelModule } from '../channels/channel.module';
import { CategoryModule } from '../category/category.module';
import { LiveQueueWorker, queueProvider } from './infrastructure/queue';
import { advertiserLiveProvider, channelLiveProviders } from './providers';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { StorageModule } from '@/shared/infrastructure/storage/storage.module';
import { LIVE_REPOSITORY_TOKEN } from './application/tokens';

@Module({
  imports: [
    UserModule,
    ChannelModule,
    StorageModule,
    CategoryModule,
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Live', schema: LiveSchema }]),
  ],
  controllers: [ChannelLiveController, AdvertiserLiveController],
  providers: [
    queueProvider,
    LiveQueueWorker,
    ...channelLiveProviders,
    ...advertiserLiveProvider,
  ],
  exports: [LIVE_REPOSITORY_TOKEN],
})
export class LiveModule {}
