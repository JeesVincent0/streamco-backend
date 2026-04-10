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
import {
  GET_ALL_USERS_USE_CASE_TOKEN,
  UPDATE_USER_STATUS_USE_CASE_TOKEN,
} from '../../application/user.tokens';
import type {
  IGetAllUsersUseCase,
  IUpdateUserStatusUseCase,
} from '../../application';
import { ResponseMessage } from '@/shared/decorators';
import { SUCCESS_MESSAGE } from '@/shared/constants/success-messages';
import { UserResponseMapper } from '../mappers';

@Controller('admin/users')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class AdminController {
  constructor(
    @Inject(GET_ALL_USERS_USE_CASE_TOKEN)
    private readonly _getAllUsersUseCase: IGetAllUsersUseCase,

    @Inject(UPDATE_USER_STATUS_USE_CASE_TOKEN)
    private readonly _updateUserStatusUseCase: IUpdateUserStatusUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @Scopes(SCOPE.ADMIN_READ)
  @ResponseMessage(SUCCESS_MESSAGE.ALL_USER_DATA_FETCHED_SUCCESSFULLY)
  async getAllUsers(@Query() query: GetAllUsersDto) {
    const result = await this._getAllUsersUseCase.execute({
      page: query.page,
      limit: query.limit,
      search: query.search,
      role: query.role,
      status: query.status,
      isVerified: query.isVerified,
      sortBy: query.sortBy,
      order: query.order,
    });

    const users = result.users.map((user) =>
      UserResponseMapper.toAdminTable(user),
    );

    return {
      ...result,
      users,
    };
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
}
