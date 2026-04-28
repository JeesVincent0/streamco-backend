import { Module } from '@nestjs/common';
import { advertiserAnalyticsProvider } from './providers';
import { AdvertiserAnalyticsController } from './presentation/controllers';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthSecurityModule, UserModule],
  controllers: [AdvertiserAnalyticsController],
  providers: [...advertiserAnalyticsProvider],
  exports: [],
})
export class AnalyticsModule {}
