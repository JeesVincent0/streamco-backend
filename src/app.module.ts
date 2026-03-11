import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@/shared/logger/logger.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { MongoDatabaseModule } from '@/shared/infrastructure/database/mongo/mongo.module';
import { HealthController } from './shared/health/health.controller';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    UserModule,
    LoggerModule,
    MongoDatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
