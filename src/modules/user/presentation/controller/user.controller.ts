import { AccessTokenGuard } from '@/modules/auth-security/infrastructure';
import type { RequestWithUserInterface } from '@/shared/interfaces';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('base')
  @UseGuards(AccessTokenGuard)
  getBaseUser(@Req() req: RequestWithUserInterface) {
    return {
      user: {
        id: req.user.jti,
        displayName: 'Jees Vincent',
        email: 'jees@gmail.com',
      },
      role: 'USER',
    };
  }
}
