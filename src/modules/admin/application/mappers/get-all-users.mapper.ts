import { BaseUser } from '@/modules/user/domain';

export class Mappers {
  static toGetAllUserResponse(users: BaseUser[]) {
    return users.map((user) => ({
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      verified: user.isVerified,
      status: user.status,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }
}
