import { Module } from '@nestjs/common';
import { ChannelLiveController } from './presentation/controllers';

@Module({
  imports: [],
  controllers: [ChannelLiveController],
  providers: [],
})
export class LiveModule {}
