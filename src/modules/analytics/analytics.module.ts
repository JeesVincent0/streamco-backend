import { Module } from '@nestjs/common';
import { advertiserAnalyticsProvider } from './providers';
import { AdvertiserAnalyticsController } from './presentation/controllers';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { UserModule } from '../user/user.module';
import { ChannelModule } from '../channels/channel.module';
import { LiveModule } from '../live/live.module';
import { CategoryModule } from '../category/category.module';
import { StorageModule } from '@/shared/infrastructure/storage/storage.module';

@Module({
  imports: [
    UserModule,
    LiveModule,
    ChannelModule,
    StorageModule,
    CategoryModule,
    AuthSecurityModule,
  ],
  controllers: [AdvertiserAnalyticsController],
  providers: [...advertiserAnalyticsProvider],
  exports: [],
})
export class AnalyticsModule {}
