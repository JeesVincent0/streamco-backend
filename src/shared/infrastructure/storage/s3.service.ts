import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
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
}
