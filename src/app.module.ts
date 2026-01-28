import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/presentation/auth.module';
import { UserModule } from './modules/user/presentation/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
