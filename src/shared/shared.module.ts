import { Module } from '@nestjs/common';
import { sharedProvider } from './providers/shared.provoder';
import {
  CACHE_BASE_REPO_PORT,
  SEND_OTP_USE_CASE,
  VERIFY_OTP_USE_CASE,
} from './application/tokens';

@Module({
  providers: [...sharedProvider],
  exports: [CACHE_BASE_REPO_PORT, SEND_OTP_USE_CASE, VERIFY_OTP_USE_CASE],
})
export class SharedModule {}
