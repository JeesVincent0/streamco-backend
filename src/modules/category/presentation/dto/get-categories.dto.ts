import { CATEGORY_STATUS } from '../../domain/enums/category-status.enum';

export interface GetCategoriesDto {
  page: number;
  limit: number;
  sortBy?: 'name' | 'slug' | 'liveCount' | 'scheduledLiveCount' | '' | 'all';
  order?: 'asc' | 'desc';
  status: CATEGORY_STATUS | string;
  search?: string;
}
