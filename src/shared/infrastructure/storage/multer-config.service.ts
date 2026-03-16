import { Injectable } from '@nestjs/common';
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
        contentType: (req, file, cb) =>
          multerS3.AUTO_CONTENT_TYPE(req, file, cb),
        key: (req, file, cb) => {
          const fileName = `avatars/${Date.now()}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    };
  }
}
