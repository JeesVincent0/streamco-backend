import { Module } from '@nestjs/common';
import { AdminUsersController } from './presentation/controller';
import { UserModule } from '../user/user.module';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { AdminUsersProviders } from './providers/users.providers';

@Module({
  imports: [UserModule, AuthSecurityModule],
  controllers: [AdminUsersController],
  providers: [...AdminUsersProviders],
})
export class AdminModule {}
