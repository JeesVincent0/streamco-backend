import { Module } from '@nestjs/common';
import { ChannelController } from './presentation/controller/channel.controller';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { channelProviders } from './provider';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from './infrastructure/schema';

@Module({
  imports: [
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
  ],
  controllers: [ChannelController],
  providers: [...channelProviders],
})
export class ChannelModule {}
