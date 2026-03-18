import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';

export type UpdateCategoryStatusInput = {
  id: string;
  status: CATEGORY_STATUS;
};
