import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { CreateChannelDto } from '../dto';
import { S3Service } from '@/shared/infrastructure/storage'; // Adjust path to where your S3Service is
import type { ChannelCreatePort } from '../../application/ports';

@Controller('channels')
export class ChannelController {
  constructor(
    private readonly _s3Service: S3Service,
    private readonly _createChannelUseCase: ChannelCreatePort,
  ) {}

  @Post('create')
  async createChannel(@Body() body: CreateChannelDto) {
    return this._createChannelUseCase.execute({
      channelId: body.channelId,
      channelName: body.channelName,
      profileImageUrl: body.profileImage
    });
    if (!body.profileImage) {
      throw new BadRequestException('Profile image is required');
    }

    let profileImageUrl = '';
    let backgroundBannerUrl = '';

    // 1. Upload Profile Image to S3
    if (body.profileImage) {
      profileImageUrl = await this._s3Service.uploadBase64(
        body.profileImage,
        'profiles',
        `${body.channelId}-profile.jpg`,
      );
    }

    // 2. Upload Banner Image to S3 (if provided)
    if (body.backgroundBanner) {
      backgroundBannerUrl = await this._s3Service.uploadBase64(
        body.backgroundBanner,
        'banners',
        `${body.channelId}-banner.jpg`,
      );
    }

    console.log('Successfully uploaded! URLs:', {
      profileImageUrl,
      backgroundBannerUrl,
    });

    // 3. Pass the clean S3 URLs to your database
    /*
    return this._createChannelUseCase.execute({
      channelName: body.channelName,
      channelId: body.channelId,
      bio: body.bio,
      profileImageUrl: profileImageUrl,      // <--- Database gets the short URL
      backgroundBannerUrl: backgroundBannerUrl // <--- Database gets the short URL
    });
    */

    return {
      status: 'success',
      message: 'Channel created successfully',
      data: { profileImageUrl, backgroundBannerUrl },
    };
  }
}
