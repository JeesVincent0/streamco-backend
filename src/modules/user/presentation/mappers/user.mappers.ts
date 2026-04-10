import { Advertiser, BaseUser, User, UserRole } from '../../domain';
import { IGetBaseUserOutput } from '../../application';
import { IStorageService } from '@/shared/infrastructure/storage/storage-service.port';
import { UserResponse } from '@/shared/types';

export class UserResponseMapper {
  static async toSignedUrl(
    avatarUrl: string | undefined,
    storageService: IStorageService,
  ) {
    if (avatarUrl && !avatarUrl.startsWith('https/lh3.googleusercontent.com')) {
      return (avatarUrl = await storageService.getSignedViewUrl(avatarUrl));
    }
    return avatarUrl;
  }

  static async toBaseUserOutput(
    user: BaseUser,
    storageService: IStorageService,
  ): Promise<IGetBaseUserOutput> {
    const avatarUrl = await this.toSignedUrl(user.avatarUrl, storageService);

    return {
      user: {
        id: user.id,
        email: user.email.getValue(),
        displayName: user.displayName,
        avatarUrl,
      },
      role: user.role,
    };
  }

  static async toResponse(
    user: BaseUser,
    storageService: IStorageService,
  ): Promise<UserResponse | void> {
    const avatarUrl = await this.toSignedUrl(user.avatarUrl, storageService);
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
        avatarUrl,
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
        avatarUrl,
      };
    }
  }
}
