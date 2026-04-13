import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ChannelLiveController } from './presentation/controllers';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { ChannelModule } from '../channels/channel.module';
import { channelLiveProviders } from './providers';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [UserModule, AuthSecurityModule, ChannelModule, CategoryModule],
  controllers: [ChannelLiveController],
  providers: [...channelLiveProviders],
})
export class LiveModule {}
