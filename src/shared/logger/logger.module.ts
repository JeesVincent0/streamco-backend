import { Global, Module } from '@nestjs/common';
import { FileLogger } from './file-logger';
import { LOGGER_TOKEN } from './token';

@Global()
@Module({
  providers: [
    {
      provide: LOGGER_TOKEN,
      useClass: FileLogger,
    },
  ],
  exports: [LOGGER_TOKEN],
})
export class LoggerModule {}
