import { User } from '../../domain/entity';
import { UserStatus } from '../../domain/enums';
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
      status: doc.status as UserStatus,
      createdAt: doc.createdAt,
      avatarUrl: doc.avatarUrl,
      bio: doc.bio,
      location: doc.location,
      socialLinks:
        doc.socialLinks?.map((link) => ({
          type: link.getType(),
          url: link.getUrl(),
        })) ?? [],
    };

    return User.restore(props);
  }

  static toPersistence(user: User): Partial<UserMongoDocument> {
    return {
      id: user.getId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      displayName: user.getDisplayName(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getValue(),
      role: user.getRole(),
      status: user.getStatus(),
      dateOfBirth: user.getDateOfBirth(),
      avatarUrl: user.getAvatarUrl(),
      createdAt: user.getCreatedAt(),
      bio: user.getBio(),
      location: user.getLocation(),
      gender: user.getGender(),
      contentType: user.getContentType(),
    };
  }
}
