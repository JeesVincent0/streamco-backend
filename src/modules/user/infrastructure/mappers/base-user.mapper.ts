import { Advertiser, BaseUser, User } from '../../domain/entity';
import { UserRole } from '../../domain/enums';
import {
  AdvertiserDiscriminatorUserDocument,
  BaseUserDocument,
  UserDiscriminatorUserDocument,
} from '../schemas';
import { AdvertiserMapper } from './advertiser.mappers';
import { UserMappers } from './user.mapper';

export class BaseUserMapper {
  static toPersistence(user: User | Advertiser) {
    switch (user.role) {
      case UserRole.USER:
        return UserMappers.toPersistence(user as User);
      default:
        return AdvertiserMapper.toPersistence(user as Advertiser);
    }
  }

  static toDomain(doc: BaseUserDocument): BaseUser {
    switch (doc.role) {
      case UserRole.USER:
        return UserMappers.toDomain(doc as UserDiscriminatorUserDocument);
      case UserRole.ADVERTISER:
        return AdvertiserMapper.toDomain(
          doc as AdvertiserDiscriminatorUserDocument,
        );
      default:
        return UserMappers.toDomain(doc as UserDiscriminatorUserDocument);
    }
  }
}
