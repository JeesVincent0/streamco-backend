import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { MulterConfigService } from './multer-config.service';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [StorageModule],
      useClass: MulterConfigService,
    }),
  ],
  providers: [S3Service, MulterConfigService],
  exports: [S3Service, MulterModule],
})
export class StorageModule {}
