import { Advertiser } from '../../domain/entity';
import { AdvertiserMongoDocument } from '../types/user-document.type';

export class AdvertiserMapper {
  static toDomain() {}
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
      companyName: user.getCompanyName(),
      createdAt: user.getCreatedAt(),
    };
  }
}
