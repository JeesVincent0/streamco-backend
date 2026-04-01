import { BadRequestException, Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IStorageService } from './storage-service.port';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

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
    // 1. FIX: Simplified regex catches any MIME type and removes the escape warning
    const matches = base64String.match(/^data:(.+?);base64,(.+)$/);
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

  // FIX: Removed 'async' keyword and wrapped the return in Promise.resolve()
  getSignedViewUrl(s3Key: string): Promise<string> {
    const cloudFrontUrl = process.env.CLOUDFRONT_URL;
    const originalUrl = new URL(s3Key);

    const originalUrlPath = originalUrl.pathname.substring(1);
    const url = `${cloudFrontUrl}/${originalUrlPath}`;

    // The Unix timestamp for when the URL should expire (e.g., in 1 hour)
    const dateLessThan = new Date(Date.now() + 1000 * 60 * 60).toISOString();

    return Promise.resolve(
      getSignedUrl({
        url,
        keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID as string,
        dateLessThan,
        privateKey: (process.env.CLOUDFRONT_PRIVATE_KEY as string).replace(
          /\\n/g,
          '\n',
        ),
      }),
    );
  }
}
