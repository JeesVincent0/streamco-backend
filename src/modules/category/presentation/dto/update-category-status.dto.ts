import { IsEnum } from 'class-validator';
import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';

export class UpdateCategoryStatusDto {
  @IsEnum(CATEGORY_STATUS, {
    message: `Status must be one of: ${Object.values(CATEGORY_STATUS).join(', ')}`,
  })
  status: CATEGORY_STATUS;
}
