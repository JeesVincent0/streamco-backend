import { IsEnum, IsString, MaxLength } from 'class-validator';
import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(15)
  name: string;

  @IsString()
  @MaxLength(20)
  slug: string;

  @IsString()
  @MaxLength(160)
  description: string;

  @IsString()
  @IsEnum(CATEGORY_STATUS)
  status: CATEGORY_STATUS;
}
