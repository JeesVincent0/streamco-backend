import { BaseUser } from '@/modules/user/domain';
import { GetAllUsersInput } from '../../inputs';

export interface IGetAllUsersUseCase {
  execute(input: GetAllUsersInput): Promise<{
    users: BaseUser[];
    pagination: { page: number; limit: number; totalPages: number };
  }>;
}
