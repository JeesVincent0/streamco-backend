import { GetAllUsersInput } from '../../inputs';
import { Mappers } from '../../mappers';
import { IUserQuery } from '../../ports';
import { IGetAllUsersUseCase } from '../../ports/get-user/get-all-users.usecase.port';
import { normalizeGetUsersQuery } from '../../utility';
import { GetAllUsersOutput } from '../../output/get-all-users.output';

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
    status: string;
    message: string;
    data: {
      users: GetAllUsersOutput[];
      pagination: { page: number; limit: number; totalPages: number };
    };
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
    const userData = Mappers.toGetAllUserResponse(users);
    return {
      status: 'success',
      message: 'Users retrieved successfully',
      data: {
        users: userData,
        pagination,
      },
    };
  }
}
