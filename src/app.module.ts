import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@/shared/logger/logger.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { MongoDatabaseModule } from '@/shared/infrastructure/database/mongo/mongo.module';
import { HealthController } from './shared/health/health.controller';
import { CategoryModule } from './modules/category/category.module';
import { ChannelModule } from './modules/channels/channel.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './shared/interceptors';

@Module({
  imports: [
    ChannelModule,
    AuthModule,
    UserModule,
    LoggerModule,
    MongoDatabaseModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
