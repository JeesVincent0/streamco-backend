import { Module } from '@nestjs/common';
import { categoryProviders } from './providers/category.providers';
import { CategoryController } from './presentation/controllers/category.controller';
import { AuthSecurityModule } from '../auth-security/auth-security.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './infrastructure/schema';

@Module({
  imports: [
    AuthSecurityModule,
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [...categoryProviders],
  exports: [],
})
export class CategoryModule {}
