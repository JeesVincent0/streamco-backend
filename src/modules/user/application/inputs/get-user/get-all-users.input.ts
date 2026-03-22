import { UserRole, UserStatus } from '@/modules/user/domain';

export interface GetAllUsersInput {
  page: number;
  limit: number;
  sortBy?: 'email' | 'displayName' | 'all' | 'createdAt';
  order?: 'asc' | 'desc';
  isVerified?: boolean | string | undefined;
  status?: UserStatus | 'all' | '';
  role?: UserRole | string;
  search?: string;
}
