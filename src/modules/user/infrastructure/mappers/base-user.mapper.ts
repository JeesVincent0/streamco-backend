import { BaseUser } from '../../domain/entity';
import { UserRole } from '../../domain/enums';
import {
  AdvertiserDiscriminatorUserDocument,
  BaseUserDocument,
  UserDiscriminatorUserDocument,
} from '../schemas';
import { AdvertiserMapper } from './advertiser.mappers';
import { UserMappers } from './user.mapper';

export class BaseUserMapper {
  static toPersistence(user) {
    switch (user.getRole()) {
      case UserRole.USER:
        return UserMappers.toPersistence(user);
      default:
        return AdvertiserMapper.toPersistence(user);
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
