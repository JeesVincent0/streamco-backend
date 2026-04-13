import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './infrastructure/schema';
import { categoryProviders } from './providers/category.providers';
import { CATEGORY_CHECKER_TOKEN } from '../live/application/tokens';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { CategoryController } from './presentation/controllers/category.controller';

@Module({
  imports: [
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [...categoryProviders],
  exports: [CATEGORY_CHECKER_TOKEN],
})
export class CategoryModule {}
