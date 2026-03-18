import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Inject,
  Req,
} from '@nestjs/common';
import { CreateChannelDto } from '../dto';
import type { CreateChannelPort } from '../../application/ports';
import {
  AccessTokenGuard,
  ScopeGuard,
  Scopes,
} from '@/modules/auth-security/presentation';
import { SCOPE } from '@/modules/auth-security/domain';
import { CREATE_CHANNEL_USE_CASE } from '../../application/token';
import { type RequestWithUserInterface } from '@/shared/interfaces';

@Controller('channels')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class ChannelController {
  constructor(
    @Inject(CREATE_CHANNEL_USE_CASE)
    private readonly _createChannelUseCase: CreateChannelPort,
  ) {}

  @Post('create')
  @Scopes(SCOPE.USER_WRITE)
  @HttpCode(HttpStatus.OK)
  async createChannel(
    @Body() body: CreateChannelDto,
    @Req() req: RequestWithUserInterface,
  ) {
    return this._createChannelUseCase.execute({
      channelId: body.channelId,
      channelName: body.channelName,
      profileImageUrl: body.profileImage,
      userId: req.user.sub,
      backgroundBannerUrl: body.backgroundBanner,
      bio: body.bio,
    });
  }
}
