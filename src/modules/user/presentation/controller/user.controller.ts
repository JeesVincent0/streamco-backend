import {
  AccessTokenGuard,
  ScopeGuard,
  Scopes,
} from '@/modules/auth-security/presentation';
import type { RequestWithUserInterface } from '@/shared/interfaces';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetBaseUserUseCase } from '../../application/use-cases/get-user/get-base-user.usecase';
import { SCOPE } from '@/modules/auth-security/domain/enums';

@Controller('user')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class UserController {
  constructor(private readonly _getBaseUserUseCase: GetBaseUserUseCase) {}
  @Get('base')
  @Scopes(SCOPE.USER_READ)
  getBaseUser(@Req() req: RequestWithUserInterface) {
    return this._getBaseUserUseCase.execute({
      id: req.user.sub,
    });
  }
}
