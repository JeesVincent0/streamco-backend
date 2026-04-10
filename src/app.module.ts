import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LiveModule } from './modules/live/live.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { LoggerModule } from '@/shared/logger/logger.module';
import { ChannelModule } from './modules/channels/channel.module';
import { CategoryModule } from './modules/category/category.module';
import { HealthController } from './shared/health/health.controller';
import { TransformResponseInterceptor } from './shared/interceptors';
import { MongoDatabaseModule } from '@/shared/infrastructure/database/mongo/mongo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongoDatabaseModule,
    LoggerModule,

    AuthModule,
    UserModule,
    CategoryModule,
    ChannelModule,
    LiveModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
