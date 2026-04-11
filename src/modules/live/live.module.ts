import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ChannelLiveController } from './presentation/controllers';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { ChannelModule } from '../channels/channel.module';

@Module({
  imports: [UserModule, AuthSecurityModule, ChannelModule],
  controllers: [ChannelLiveController],
  providers: [],
})
export class LiveModule {}
