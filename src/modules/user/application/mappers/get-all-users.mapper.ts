import { BaseUser, UserRole } from '@/modules/user/domain';
import { GetAllUsersOutput } from '../output/get-all-users.output';

export class Mappers {
  static toGetAllUserResponse(users: BaseUser[]): GetAllUsersOutput[] {
    return users
      .filter((user) => user.role !== UserRole.ADMIN)
      .map((user) => ({
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        status: user.status,
        createdAt: user.createdAt,
      }));
  }
}
