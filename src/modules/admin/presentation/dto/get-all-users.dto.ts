import { UserRole, UserStatus } from '@/modules/user/domain';

export interface GetAllUsersDto {
  page: number;
  limit: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  isVerified?: boolean;
  status?: UserStatus;
  role?: UserRole;
  search?: string;
}
