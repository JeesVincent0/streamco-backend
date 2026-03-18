import { Category } from '../../domain/entity';

export type CategoriesType = {
  id: string;
  name: string;
  status: string;
  scheduledLiveCount: number;
  liveCount: number;
};

export type Pagination = {
  page: number;
  limit: number;
  totalPages: number;
};

// Used by the Repository (Returns Domain Entities)
export type CategoriesOuput = {
  data: {
    categories: Category[];
    pagination: Pagination;
  };
};

// Used by the Use Case / Controller (Returns raw JSON/Types)
export type GetCategoriesOuput = {
  status: string;
  message: string;
  data: {
    categories: CategoriesType[]; // Notice this is an Array now!
    pagination: Pagination;
  };
};
