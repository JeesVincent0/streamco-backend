import { SCOPE } from '@/modules/auth-security/domain';
import {
  AccessTokenGuard,
  ScopeGuard,
  Scopes,
} from '@/modules/auth-security/presentation';
import { type GetAllUsersDto } from '@/shared/dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserStatusDto } from '../dto';
import { type IGetAllUsersUseCase } from '../../application/ports/get-user/get-all-users.usecase.port';
import { GET_ALL_USERS_USE_CASE_TOKEN } from '../../application/user.tokens';

@Controller('admin/users')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class AdminController {
  constructor(
    @Inject(GET_ALL_USERS_USE_CASE_TOKEN)
    private readonly _getAllUsersUseCase: IGetAllUsersUseCase,
    // private readonly _updateUserStatusUseCase: UpdateUserStatusUseCase,
    // private readonly _getUserByIdUseCase: GetUserByIdUseCase,
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

  //   // Endpoint to update the status of a user ( ACTIVE, SUSPENDED, DELETED)
  //   @Patch(':id/status')
  //   @HttpCode(HttpStatus.NO_CONTENT)
  //   @Scopes(SCOPE.ADMIN_WRITE)
  //   async updateUserStatus(
  //     @Param('id') id: string,
  //     @Body() body: UpdateUserStatusDto,
  //   ) {
  //     return await this._updateUserStatusUseCase.execute(id, body.status);
  //   }

  //   @Get(':id')
  //   @HttpCode(HttpStatus.OK)
  //   @Scopes(SCOPE.ADMIN_READ)
  //   getUserById(@Param('id') id: string) {
  //     return this._getUserByIdUseCase.execute(id);
  //   }
}
