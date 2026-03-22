import { BaseUser } from '@/modules/user/domain';
import { GetAllUsersDto } from '@/shared/dto/';

export interface IUserQuery {
  getUsers(query: GetAllUsersDto): Promise<{
    users: BaseUser[];
    pagination: { page: number; limit: number; totalPages: number };
  }>;
}
