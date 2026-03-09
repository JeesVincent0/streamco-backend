import { UserStatus } from '@/modules/user/domain';
import { GetAllUsersInput } from '../../inputs';

export class GetAllUsersUseCase {
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

    await new Promise((resolve) => setTimeout(resolve, 5000));
    return {
      status: 'success',
      message: 'Users retrieved successfully',
      data: {
        nextPage: true,
        users: [
          {
            id: page * limit + 1,
            displayName: 'User 1',
            status: UserStatus.ACTIVE,
            email: 'user1@example.com',
            verified: true,
            role: 'USER',
          },
          {
            id: page * limit + 2,
            displayName: 'User 2',
            status: UserStatus.SUSPENDED,
            email: 'user2@example.com',
            verified: false,
            role: 'USER',
          },
          {
            id: page * limit + 3,
            displayName: search ? search : '',
            status: UserStatus.ACTIVE,
            email: 'user1@example.com',
            verified: true,
            role: 'USER',
          },
          {
            id: 4,
            displayName: 'User 2',
            status: UserStatus.SUSPENDED,
            email: 'user2@example.com',
            verified: false,
            role: 'USER',
          },
          {
            id: 5,
            displayName: 'User 1',
            status: UserStatus.ACTIVE,
            email: 'user1@example.com',
            verified: true,
            role: 'USER',
          },
          {
            id: 6,
            displayName: 'User 2',
            status: UserStatus.SUSPENDED,
            email: 'user2@example.com',
            verified: false,
            role: 'USER',
          },
          {
            id: 7,
            displayName: 'User 1',
            status: UserStatus.ACTIVE,
            email: 'user1@example.com',
            verified: true,
            role: 'USER',
          },
          {
            id: 8,
            displayName: 'User 2',
            status: UserStatus.SUSPENDED,
            email: 'user2@example.com',
            verified: false,
            role: 'USER',
          },
          {
            id: 9,
            displayName: 'User 1',
            status: UserStatus.ACTIVE,
            email: 'user1@example.com',
            verified: true,
            role: 'USER',
          },
          {
            id: 10,
            displayName: 'User 2',
            status: UserStatus.SUSPENDED,
            email: 'user2@example.com',
            verified: false,
            role: 'USER',
          },
        ],
      },
    };
  }
}
