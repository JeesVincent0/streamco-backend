import { Injectable, BadRequestException } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import multerS3 from 'multer-s3';
import { S3Service } from './s3.service';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly s3Service: S3Service) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multerS3({
        s3: this.s3Service.s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME as string,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
          // Dynamically route the file based on its field name
          const folder =
            file.fieldname === 'backgroundBanner' ? 'banners' : 'profiles';
          const cleanFileName = file.originalname.replace(/\s+/g, '_');
          const fileName = `channels/${folder}/${Date.now()}-${cleanFileName}`;

          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
    };
  }
}
