export interface ICategoryChecker {
  isCategoryActive(categoryId: string): Promise<boolean>;
}
