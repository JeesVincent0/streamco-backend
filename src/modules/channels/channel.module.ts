import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from './infrastructure/schema';
import {
  adminChannelProviders,
  channelProviders,
  userChannelProviders,
} from './provider';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { StorageModule } from '@/shared/infrastructure/storage/storage.module';
import {
  ChannelController,
  UserChannelController,
  AdminChannelController,
} from './presentation/controller';
import { ChannelOwnershipGuard } from './infrastructure/guards';
import { ActiveUserGuard } from '@/shared/infrastructure/guards/active-user.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    StorageModule,
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
  ],
  controllers: [
    ChannelController,
    UserChannelController,
    AdminChannelController,
  ],
  providers: [
    ActiveUserGuard,
    ChannelOwnershipGuard,
    ...channelProviders,
    ...userChannelProviders,
    ...adminChannelProviders,
  ],
})
export class ChannelModule {}
