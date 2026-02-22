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
      isProfileCompleted: doc.isProfileCompleted,
      isVerified: doc.isVerified,
      companyName: doc.companyName,
      createdAt: doc.createdAt,
    };

    return Advertiser.restore(props);
  }
  static toPersistence(user: Advertiser): Partial<AdvertiserMongoDocument> {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName,
      email: user.email.getValue(),
      password: user.password?.getValue(),
      role: user.role,
      status: user.status,
      isProfileCompleted: user.isProfileCompleted,
      isVerified: user.isVerified,
      companyName: user.companyName,
      createdAt: user.createdAt,
    };
  }
}
