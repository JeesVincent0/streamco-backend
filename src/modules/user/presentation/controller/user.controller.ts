import {
  AccessTokenGuard,
  ScopeGuard,
  Scopes,
} from '@/modules/auth-security/presentation';
import type { RequestWithUserInterface } from '@/shared/interfaces';
import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { GetBaseUserUseCase } from '../../application/use-cases/get-user/get-base-user.usecase';
import { SCOPE } from '@/modules/auth-security/domain/enums';
import type { GetUserProfileInterface } from '../../application/interfaces';
import { GET_USER_PROFILE_INTERFACE_PORT } from '../../application';

@Controller('user')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class UserController {
  constructor(
    private readonly _getBaseUserUseCase: GetBaseUserUseCase,
    @Inject(GET_USER_PROFILE_INTERFACE_PORT)
    private readonly _getUserProfileUseCase: GetUserProfileInterface,
  ) {}
  @Get('base')
  @Scopes(SCOPE.USER_READ)
  getBaseUser(@Req() req: RequestWithUserInterface) {
    return this._getBaseUserUseCase.execute({
      id: req.user.sub,
    });
  }

  @Get('profile')
  @Scopes(SCOPE.USER_READ)
  getProfile(@Req() req: RequestWithUserInterface) {
    return this._getUserProfileUseCase.execute({
      id: req.user.sub,
    });
  }
}
