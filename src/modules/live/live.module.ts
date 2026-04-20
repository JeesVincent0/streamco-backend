import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { channelLiveProviders } from './providers';
import { LiveSchema } from './infrastructure/schema';
import { ChannelModule } from '../channels/channel.module';
import { CategoryModule } from '../category/category.module';
import { ChannelLiveController } from './presentation/controllers';
import { LiveQueueWorker, queueProvider } from './infrastructure/queue';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { StorageModule } from '@/shared/infrastructure/storage/storage.module';

@Module({
  imports: [
    UserModule,
    ChannelModule,
    StorageModule,
    CategoryModule,
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Live', schema: LiveSchema }]),
  ],
  controllers: [ChannelLiveController],
  providers: [queueProvider, LiveQueueWorker, ...channelLiveProviders],
})
export class LiveModule {}
