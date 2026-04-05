import { AccessTokenGuard } from '@/modules/auth-security/presentation';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChannelOwnershipGuard } from '../../infrastructure/guards';

@Controller('channel')
@UseGuards(AccessTokenGuard, ChannelOwnershipGuard)
export class ChannelController {
  constructor() {}

  @Get(':id')
  getBaseChannel(@Param('id') id: string) {
    console.log('Get base channel id', id);
  }
}
