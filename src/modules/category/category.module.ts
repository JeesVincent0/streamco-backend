import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './infrastructure/schema';
import { categoryProviders } from './providers/category.providers';
import { CATEGORY_CHECKER_TOKEN } from '../live/application/tokens';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { CategoryController } from './presentation/controllers/category.controller';
import { CATEGORY_REPO_TOKEN } from './application/token';

@Module({
  imports: [
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [...categoryProviders],
  exports: [CATEGORY_CHECKER_TOKEN, CATEGORY_REPO_TOKEN],
})
export class CategoryModule {}
