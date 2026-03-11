import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
import { UpdateUserStatusDto } from '../dto';
import { UpdateUserStatusUseCase } from '../../application/usecase/user-usecase/update-user-status.usecase';
import { GetUserByIdUseCase } from '../../application/usecase/user-usecase/get-user.usecase';

/*
 * AdminUsersController handles administrative actions related to user management.
 * 1. GET /admin/users - Retrieves a paginated list of users with optional filtering and sorting.
 * 2. PATCH /admin/users/:id/status - Updates the status of a specific user (ACTIVE, SUSPENDED, DELETED).
 * 3. GET /admin/users/:id - Retrieves detailed information about a specific user by their ID.
 *
 * This controller is protected by AccessTokenGuard and ScopeGuard to ensure that only authorized admin users can access these endpoints.
 * The controller interacts with the GetAllUsersUseCase and UpdateUserStatusUseCase to perform the necessary business logic for each endpoint.
 */

@Controller('admin/users')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class AdminUsersController {
  constructor(
    private readonly _getAllUsersUseCase: GetAllUsersUseCase,
    private readonly _updateUserStatusUseCase: UpdateUserStatusUseCase,
    private readonly _getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  // Endpoint to get all users with pagination, filtering, and sorting options
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

  // Endpoint to update the status of a user ( ACTIVE, SUSPENDED, DELETED)
  @Patch(':id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Scopes(SCOPE.ADMIN_WRITE)
  async updateUserStatus(
    @Param('id') id: string,
    @Body() body: UpdateUserStatusDto,
  ) {
    return await this._updateUserStatusUseCase.execute(id, body.status);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.ADMIN_READ)
  getUserById(@Param('id') id: string) {
    return this._getUserByIdUseCase.execute(id);
  }
}
