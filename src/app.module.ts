import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '@/common/logger/logger.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { MongoDatabaseModule } from '@/shared/infrastructure/database/mongo/mongo.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    LoggerModule,
    MongoDatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
