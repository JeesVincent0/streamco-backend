import { Module } from '@nestjs/common';
import { ChannelController } from './presentation/controller/channel.controller';

@Module({
  imports: [],
  controllers: [ChannelController],
  providers: [],
})
export class ChannelModule {}
