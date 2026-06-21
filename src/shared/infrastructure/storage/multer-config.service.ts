import { Injectable, BadRequestException } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { type UploadApiOptions, v2 as cloudinaryInstance } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    cloudinaryInstance.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    return {
      storage: new CloudinaryStorage({
        cloudinary: cloudinaryInstance,
        params: (_req, file): UploadApiOptions => ({
          folder: this.getFolder(file),
          public_id: `${Date.now()}-${this.toPublicId(file.originalname)}`,
          resource_type: 'image',
          type: 'authenticated',
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
          overwrite: false,
        }),
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
      limits: { fileSize: 5 * 1024 * 1024 },
    };
  }

  private getFolder(file: Express.Multer.File): string {
    const folder =
      file.fieldname === 'backgroundBanner' ? 'banners' : 'profiles';

    return `channels/${folder}`;
  }

  private toPublicId(value: string): string {
    return value
      .replace(/\.[^/.]+$/, '')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_.-]/g, '_');
  }
}
