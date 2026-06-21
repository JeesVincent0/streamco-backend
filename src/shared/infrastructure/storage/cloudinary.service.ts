import { BadRequestException, Injectable } from '@nestjs/common';
import {
  type UploadApiOptions,
  type UploadApiResponse,
  type UrlOptions,
  v2 as cloudinary,
} from 'cloudinary';
import { IStorageService } from './storage-service.port';

const SIGNED_URL_EXPIRES_IN_SECONDS = 3600;
const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'] as const;

type ImageFormat = (typeof IMAGE_FORMATS)[number];

interface StoredCloudinaryAsset {
  publicId: string;
  format?: ImageFormat;
}

export const configureCloudinary = (): void => {
  cloudinary.config({
    cloud_name: getRequiredEnv('CLOUDINARY_CLOUD_NAME'),
    api_key: getRequiredEnv('CLOUDINARY_API_KEY'),
    api_secret: getRequiredEnv('CLOUDINARY_API_SECRET'),
    secure: true,
  });
};

export const CLOUDINARY_CLIENT = cloudinary;

@Injectable()
export class CloudinaryService implements IStorageService {
  constructor() {
    configureCloudinary();
  }

  async uploadBase64(
    base64String: string,
    folder: string,
    filename: string,
  ): Promise<string> {
    this.assertImageDataUri(base64String);

    const result: UploadApiResponse = await cloudinary.uploader.upload(
      base64String,
      this.buildUploadOptions(folder, filename),
    );

    return result.secure_url;
  }

  async getSignedViewUrl(dbStoredUrl: string): Promise<string> {
    const asset = this.extractStoredCloudinaryAsset(dbStoredUrl);
    const options: UrlOptions = {
      secure: true,
      sign_url: true,
      type: 'authenticated',
      resource_type: 'image',
      expires_at: this.getSignedUrlExpiresAt(),
    };

    if (asset.format) {
      options.format = asset.format;
    }

    return cloudinary.url(asset.publicId, options);
  }

  private assertImageDataUri(base64String: string): void {
    const matches = base64String.match(/^data:(.+?);base64,(.+)$/);

    if (!matches || matches.length !== 3 || !matches[2]) {
      throw new BadRequestException('Invalid base64 string provided');
    }

    if (!matches[1].match(/^image\/(jpg|jpeg|png|webp)$/i)) {
      throw new BadRequestException('Only image files are allowed!');
    }
  }

  private buildUploadOptions(
    folder: string,
    filename: string,
  ): UploadApiOptions {
    return {
      folder: this.buildFolderPath(folder),
      public_id: `${Date.now()}-${this.toPublicId(filename)}`,
      resource_type: 'image',
      type: 'authenticated',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      overwrite: false,
    };
  }

  private extractStoredCloudinaryAsset(
    dbStoredUrl: string,
  ): StoredCloudinaryAsset {
    if (!dbStoredUrl) {
      throw new BadRequestException('Invalid Cloudinary URL provided');
    }

    try {
      const parsedUrl = new URL(dbStoredUrl);
      const pathSegments = parsedUrl.pathname
        .split('/')
        .filter(Boolean)
        .map((segment) => decodeURIComponent(segment));

      return this.extractAssetFromPathSegments(pathSegments);
    } catch {
      return this.stripFormatFromPublicId(dbStoredUrl);
    }
  }

  private extractAssetFromPathSegments(
    pathSegments: string[],
  ): StoredCloudinaryAsset {
    const versionIndex = pathSegments.findIndex((segment) =>
      /^v\d+$/.test(segment),
    );

    const publicIdSegments =
      versionIndex >= 0
        ? pathSegments.slice(versionIndex + 1)
        : this.getPublicIdSegmentsWithoutVersion(pathSegments);

    if (publicIdSegments.length === 0) {
      throw new BadRequestException('Invalid Cloudinary URL provided');
    }

    return this.stripFormatFromPublicId(publicIdSegments.join('/'));
  }

  private getPublicIdSegmentsWithoutVersion(pathSegments: string[]): string[] {
    const resourceTypeIndex = pathSegments.findIndex((segment) =>
      ['image', 'video', 'raw'].includes(segment),
    );

    if (resourceTypeIndex >= 0) {
      return pathSegments.slice(resourceTypeIndex + 2);
    }

    return pathSegments;
  }

  private stripFormatFromPublicId(publicId: string): StoredCloudinaryAsset {
    const extensionMatch = publicId.match(/\.([a-zA-Z0-9]+)$/);

    if (!extensionMatch) {
      return { publicId };
    }

    const extension = extensionMatch[1].toLowerCase();

    if (!this.isImageFormat(extension)) {
      return { publicId };
    }

    return {
      publicId: publicId.slice(0, -(extension.length + 1)),
      format: extension,
    };
  }

  private isImageFormat(format: string): format is ImageFormat {
    return IMAGE_FORMATS.includes(format as ImageFormat);
  }

  private getSignedUrlExpiresAt(): number {
    return Math.floor(Date.now() / 1000) + SIGNED_URL_EXPIRES_IN_SECONDS;
  }

  private buildFolderPath(folder: string): string {
    return `channels/${this.toPublicId(folder)}`;
  }

  private toPublicId(value: string): string {
    return value
      .replace(/\.[^/.]+$/, '')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_.-]/g, '_');
  }
}

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is required for Cloudinary storage`);
  }

  return value;
};
