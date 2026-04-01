import {
  IsEnum,
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @Transform(({ value }) => (typeof value === 'string' ? value?.trim() : ''))
  @IsString()
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  @MaxLength(30)
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Slug cannot be empty' })
  @MaxLength(30)
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug can only contain lowercase letters, numbers, and hyphens',
  })
  slug: string;

  @IsOptional()
  @IsString()
  @MaxLength(500) // Synced with frontend Zod schema
  description?: string;

  @IsEnum(CATEGORY_STATUS)
  status: CATEGORY_STATUS;
}
