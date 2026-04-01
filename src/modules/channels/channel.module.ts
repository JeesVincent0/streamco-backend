import { Module } from '@nestjs/common';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { adminChannelProviders, userChannelProviders } from './provider';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from './infrastructure/schema';
import { StorageModule } from '@/shared/infrastructure/storage/storage.module';
import {
  AdminChannelController,
  ChannelController,
} from './presentation/controller';

@Module({
  imports: [
    StorageModule,
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
  ],
  controllers: [ChannelController, AdminChannelController],
  providers: [...userChannelProviders, ...adminChannelProviders],
})
export class ChannelModule {}
