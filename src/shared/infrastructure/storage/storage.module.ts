import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { MulterConfigService } from './multer-config.service';
import { STORAGE_SERVICE_PORT_TOKEN } from './token';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  providers: [
    {
      provide: STORAGE_SERVICE_PORT_TOKEN,
      useClass: CloudinaryService,
    },
    MulterConfigService,
  ],
  exports: [MulterModule, STORAGE_SERVICE_PORT_TOKEN],
})
export class StorageModule {}
