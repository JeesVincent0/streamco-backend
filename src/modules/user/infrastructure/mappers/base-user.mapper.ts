import { BaseUser } from '../../domain/entity';
import { UserRole } from '../../domain/enums';
import { BaseUserDocument, UserDocument } from '../schemas';
import { UserMappers } from './user.mapper';

export class BaseUserMapper {
  static toDomain(doc: BaseUserDocument): BaseUser {
    switch (doc.role) {
      case UserRole.USER:
        return UserMappers.toDomain(doc as UserDocument);
      case UserRole.ADMIN:
        return UserMappers.toDomain(doc as UserDocument);
      default:
        return UserMappers.toDomain(doc as UserDocument);
    }
  }
}
