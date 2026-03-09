import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetAllUsersUseCase } from '../../application/usecase/';

import {
  AccessTokenGuard,
  ScopeGuard,
  Scopes,
} from '@/modules/auth-security/presentation';
import { SCOPE } from '@/modules/auth-security/domain';
import type { GetAllUsersDto } from '@/shared/dto';

@Controller('admin/users')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class AdminUsersController {
  constructor(private readonly _getAllUsersUseCase: GetAllUsersUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.ADMIN_READ)
  getAllUsers(@Query() query: GetAllUsersDto) {
    return this._getAllUsersUseCase.execute({
      page: query.page,
      limit: query.limit,
      search: query.search,
      role: query.role,
      status: query.status,
      isVerified: query.isVerified,
      sortBy: query.sortBy,
      order: query.order,
    });
  }
}
