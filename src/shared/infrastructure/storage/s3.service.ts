import { BadRequestException, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IStorageService } from './storage-service.port';

@Injectable()
export class S3Service implements IStorageService {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION as string,
      followRegionRedirects: true,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }

  get s3Client(): S3Client {
    return this.client;
  }

  async uploadBase64(
    base64String: string,
    folder: string,
    filename: string,
  ): Promise<string> {
    // 1. Separate the mimetype from the base64 data
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new BadRequestException('Invalid base64 string provided');
    }

    const contentType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');

    // 2. Create a unique path in your bucket
    const key = `channels/${folder}/${Date.now()}-${filename}`;

    // 3. Upload to S3
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await this.client.send(command);

    // 4. Return the public URL so you can save it in MongoDB!
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
