import { UserRole, UserStatus } from '@/modules/user/domain';

export interface GetAllUsersDto {
  page: number;
  limit: number;
  sortBy?: 'email' | 'displayName' | 'all' | 'createdAt';
  order?: 'asc' | 'desc';
  isVerified?: boolean | undefined | string;
  status?: UserStatus | 'all' | '';
  role?: UserRole | undefined | string;
  search?: string;
}
