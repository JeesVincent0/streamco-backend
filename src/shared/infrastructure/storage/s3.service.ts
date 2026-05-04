import { BadRequestException, Global, Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { IStorageService } from './storage-service.port';

import { getSignedUrl as awsGetSignedUrl } from '@aws-sdk/s3-request-presigner';

@Global()
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
    const matches = base64String.match(/^data:(.+?);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new BadRequestException('Invalid base64 string provided');
    }

    const contentType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');

    const key = `channels/${folder}/${Date.now()}-${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    });

    await this.client.send(command);
    return key;
  }

  async getSignedViewUrl(s3Key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
    });

    const getUrl = awsGetSignedUrl as unknown as (
      client: S3Client,
      command: GetObjectCommand,
      options: { expiresIn: number },
    ) => Promise<string>;

    const signedUrl = await getUrl(this.client, command, {
      expiresIn: 3600,
    });

    return signedUrl;
  }
}
