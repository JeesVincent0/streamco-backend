import { UserRole, UserStatus } from '@/modules/user/domain';

export interface GetAllUsersInput {
  page: number;
  limit: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  isVerified?: boolean;
  status?: UserStatus;
  role?: UserRole;
  search?: string;
}
