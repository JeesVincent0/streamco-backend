import { User } from '../../domain/entity';
import { UserSocialMediaType, UserStatus } from '../../domain/enums';
import { UserRestoreProps } from '../../domain/types/user.restore';
import { UserDiscriminatorUserDocument } from '../schemas';
import { UserMongoDocument } from '../types/user-document.type';

export class UserMappers {
  static toDomain(doc: UserDiscriminatorUserDocument): User {
    const props: UserRestoreProps = {
      id: doc.id,
      firstName: doc.firstName,
      lastName: doc.lastName,
      displayName: doc.displayName,
      email: doc.email,
      password: doc.password,
      gender: doc.gender,
      dateOfBirth: doc.dateOfBirth,
      contentType: doc.contentType,
      role: doc.role,
      isProfileCompleted: doc.isProfileCompleted,
      isVerified: doc.isVerified,
      status: doc.status as UserStatus,
      createdAt: doc.createdAt,
      avatarUrl: doc.avatarUrl,
      bio: doc.bio,
      location: doc.location,
      socialLinks:
        (
          doc.socialLinks as unknown as {
            type: UserSocialMediaType;
            url: string;
          }[]
        )?.map((link) => ({
          type: link.type,
          url: link.url,
        })) ?? [],
    };

    return User.restore(props);
  }

  static toPersistence(user: User): Partial<UserMongoDocument> {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email.getValue(),
      password: user.password?.getValue(),
      role: user.role,
      status: user.status,
      dateOfBirth: user.dateOfBirth,
      isProfileCompleted: user.isProfileCompleted,
      googleId: user.googleId,
      isVerified: user.isVerified,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      bio: user.bio,
      location: user.location,
      gender: user.gender,
      contentType: user.contentType,
      socialLinks: user.socialLinks.map((link) => ({
        type: link.getType(),
        url: link.getUrl(),
      })),
    };
  }
}
