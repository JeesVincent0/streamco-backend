import { IUserQuery } from '../../ports';
import { GetAllUsersInput } from '../../inputs';
import { normalizeGetUsersQuery } from '../../utility';
import { IGetAllUsersUseCase } from '../../ports/get-user/get-all-users.usecase.port';
import { BaseUser } from '@/modules/user/domain';

export class GetAllUsersUseCase implements IGetAllUsersUseCase {
  constructor(private readonly _getAllUsersPort: IUserQuery) {}

  async execute({
    page,
    limit,
    search,
    role,
    status,
    isVerified,
    sortBy,
    order,
  }: GetAllUsersInput): Promise<{
    users: BaseUser[];
    pagination: { page: number; limit: number; totalPages: number };
  }> {
    const normalizedQuery = normalizeGetUsersQuery({
      page,
      limit,
      search,
      role,
      status,
      isVerified,
      sortBy,
      order,
    });

    const { users, pagination } =
      await this._getAllUsersPort.getUsers(normalizedQuery);

    return {
      users,
      pagination,
    };
  }
}
