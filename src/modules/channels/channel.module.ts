import { Module } from '@nestjs/common';
import { ChannelController } from './presentation/controller/channel.controller';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { channelProviders } from './provider/channel.provider';

@Module({
  imports: [AuthSecurityModule],
  controllers: [ChannelController],
  providers: [...channelProviders],
})
export class ChannelModule {}
