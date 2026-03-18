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
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto, type GetCategoriesDto } from '../dto';
import type {
  CreateCategoryPort,
  GetCategoriesInterface,
} from '../../application/ports';
import {
  CREATE_CATEGORY_USE_CASE,
  GET_CATEGORIES_USE_CASE,
} from '../../application/token';

@Controller('admin/categories')
@UseGuards(AccessTokenGuard, ScopeGuard)
export class CategoryController {
  constructor(
    @Inject(CREATE_CATEGORY_USE_CASE)
    private readonly _createCategory: CreateCategoryPort,

    @Inject(GET_CATEGORIES_USE_CASE)
    private readonly _getAllCategories: GetCategoriesInterface,
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
  @Scopes(SCOPE.ADMIN_READ)
  @HttpCode(HttpStatus.OK)
  getCategories(@Query() params: GetCategoriesDto) {
    return this._getAllCategories.execute(params);
  }
}
