import { Module } from '@nestjs/common';
import { sharedProvider } from './providers/shared.provoder';
import { CACHE_BASE_REPO_PORT } from './application/tokens';

@Module({
  providers: [...sharedProvider],
  exports: [CACHE_BASE_REPO_PORT],
})
export class SharedModule {}
