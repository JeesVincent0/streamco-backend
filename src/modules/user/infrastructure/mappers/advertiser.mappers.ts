import { Advertiser } from '../../domain/entity';
import { UserStatus } from '../../domain/enums';
import { AdvertiserRestoreProps } from '../../domain/types/advertiser.restore';
import { AdvertiserDiscriminatorUserDocument } from '../schemas';
import { AdvertiserMongoDocument } from '../types/user-document.type';

export class AdvertiserMapper {
  static toDomain(doc: AdvertiserDiscriminatorUserDocument): Advertiser {
    const props: AdvertiserRestoreProps = {
      id: doc.id,
      firstName: doc.firstName,
      lastName: doc.lastName,
      displayName: doc.displayName,
      email: doc.email,
      password: doc.password,
      role: doc.role,
      status: doc.status as UserStatus,
      isVerified: doc.isVerified,
      companyName: doc.companyName,
      createdAt: doc.createdAt,
    };

    return Advertiser.restore(props);
  }
  static toPersistence(user: Advertiser): Partial<AdvertiserMongoDocument> {
    return {
      id: user.getId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      displayName: user.getDisplayName(),
      email: user.getEmail().getValue(),
      password: user.getPassword().getValue(),
      role: user.getRole(),
      status: user.getStatus(),
      isVerified: user.getIsVerified(),
      companyName: user.getCompanyName(),
      createdAt: user.getCreatedAt(),
    };
  }
}
