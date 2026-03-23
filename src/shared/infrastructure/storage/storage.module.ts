import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { MulterConfigService } from './multer-config.service';
import { STORAGE_SERVICE_PORT_TOKEN } from './token';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [StorageModule],
      useClass: MulterConfigService,
    }),
  ],
  providers: [
    {
      provide: STORAGE_SERVICE_PORT_TOKEN,
      useClass: S3Service,
    },
    MulterConfigService,
  ],
  exports: [MulterModule, STORAGE_SERVICE_PORT_TOKEN],
})
export class StorageModule {}
