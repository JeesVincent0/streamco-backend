import { Advertiser, BaseUser, User, UserRole } from '@/modules/user/domain';
import { UserResponse } from '@/shared/types';

/*
 * Mapper to convert User domain entity to UserResponse DTO.
 * Handles both User and Advertiser types based on the role.
 *
 */

export class GetUserProfileMapper {
  static toResponse(user: BaseUser): UserResponse | void {
    if (user.role === UserRole.USER && user instanceof User) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        email: user.email.getValue(),
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        isProfileCompleted: user.isProfileCompleted,
        createdAt: user.createdAt,
        dob: user.dateOfBirth ?? null,
        location: user.location ?? null,
        contentType: user.contentType ?? null,
        gender: user.gender ?? null,
        socialLinks: user.socialLinks.map((link) => ({
          type: link.getType(),
          url: link.getUrl(),
        })),
        avatarUrl: user.avatarUrl ?? null,
        bio: user.bio ?? null,
      };
    }

    if (user.role === UserRole.ADVERTISER && user instanceof Advertiser) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
        email: user.email.getValue(),
        role: user.role,
        status: user.status,
        isVerified: user.isVerified,
        isProfileCompleted: user.isProfileCompleted,
        companyName: user.companyName ?? null,
        createdAt: user.createdAt,
        avatarUrl: user.avatarUrl ?? null,
      };
    }
  }
}
