import { UserRole, UserStatus } from '@/modules/user/domain';
import { GetAllUsersInput } from '../../inputs';
import { UserQueryPort } from '@/modules/user/application';
import { Mappers } from '../../mappers';

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
    console.log('GetAllUsersUseCase', {
      page,
      limit,
      search,
      role,
      status,
      isVerified,
      sortBy,
      order,
    });

    role =
      role !== UserRole.USER &&
      role !== UserRole.ADVERTISER &&
      role !== UserRole.ADMIN
        ? undefined
        : role;
    search = search === '' ? undefined : search;
    status =
      status !== UserStatus.ACTIVE &&
      status !== UserStatus.SUSPENDED &&
      status !== UserStatus.DELETED
        ? undefined
        : status;
    if (
      isVerified === undefined ||
      isVerified === 'all' ||
      isVerified === 'undefined'
    ) {
      isVerified = undefined;
    } else if (isVerified === 'true' || isVerified === true) {
      isVerified = true;
    } else if (isVerified === 'false' || isVerified === false) {
      isVerified = false;
    }

    const { users, pagination } = await this._getAllUsersPort.getUsers({
      page,
      limit,
      search,
      role,
      status,
      isVerified,
      sortBy,
      order,
    });
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
