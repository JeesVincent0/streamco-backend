import { GetAllUsersInput } from '../../inputs';
import { UserQueryPort } from '@/modules/user/application';
import { Mappers } from '../../mappers';
import { normalizeGetUsersQuery } from '../../utility';

export class GetAllUsersUseCase {
  constructor(private readonly _getAllUsersPort: UserQueryPort) {}
  async execute({
    page,
    limit,
    search,
    role,
    status,
    isVerified,
    sortBy,
    order,
  }: GetAllUsersInput) {
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
    const userData = Mappers.toGetAllUserResponse(users);
    return {
      status: 'success',
      message: 'Users retrieved successfully',
      data: {
        pagination,
        users: userData,
      },
    };
  }
}
