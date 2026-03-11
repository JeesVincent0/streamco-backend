import { BaseUser, UserRole } from '@/modules/user/domain';

export class Mappers {
  static toGetAllUserResponse(users: BaseUser[]) {
    return users
      .filter((user) => user.role !== UserRole.ADMIN) // remove admins
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
