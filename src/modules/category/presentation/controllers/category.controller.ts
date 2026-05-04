import { SCOPE } from '@/modules/auth-security/domain';
import {
  AccessTokenGuard,
  ScopeGuard,
  Scopes,
} from '@/modules/auth-security/presentation';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryStatusDto,
  type GetCategoriesDto,
} from '../dto';
import type {
  ICreateCategoryUasecase,
  IGetCategoriesUsecase,
  IUpdateCategoryStatusUsecase,
} from '../../application/ports';
import {
  CREATE_CATEGORY_USE_CASE_TOKEN,
  GET_CATEGORIES_USE_CASE_TOKEN,
  UPDATE_CATEGORY_STATUS_USE_CASE_TOKEN,
} from '../../application/token';

@Controller('admin/categories')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class CategoryController {
  constructor(
    @Inject(CREATE_CATEGORY_USE_CASE_TOKEN)
    private readonly _createCategory: ICreateCategoryUasecase,

    @Inject(GET_CATEGORIES_USE_CASE_TOKEN)
    private readonly _getAllCategories: IGetCategoriesUsecase,

    @Inject(UPDATE_CATEGORY_STATUS_USE_CASE_TOKEN)
    private readonly _updateCategory: IUpdateCategoryStatusUsecase,
  ) {}

  @Post('create')
  @Scopes(SCOPE.ADMIN_WRITE)
  @HttpCode(HttpStatus.OK)
  create(@Body() body: CreateCategoryDto) {
    return this._createCategory.execute({
      name: body.name,
      slug: body.slug,
      description: body.description,
      status: body.status,
    });
  }

  @Get()
  // @Scopes(SCOPE.ADMIN_READ)
  @HttpCode(HttpStatus.OK)
  getCategories(@Query() params: GetCategoriesDto) {
    return this._getAllCategories.execute(params);
  }

  @Post(':id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Scopes(SCOPE.ADMIN_WRITE)
  updateUserStatus(
    @Param('id') id: string,
    @Body() body: UpdateCategoryStatusDto,
  ) {
    return this._updateCategory.execute({
      id,
      status: body.status,
    });
  }
}
