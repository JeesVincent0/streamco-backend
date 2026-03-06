import { UserRole } from '@/modules/user/domain/enums';
import { Email } from '@/modules/user/domain/value-objects';

export class ResponseData {
  static getDate(
    id: string,
    displayName: string,
    email: Email,
    role: UserRole,
    avatarUrl?: string,
  ) {
    return {
      user: {
        id,
        displayName,
        email: email.getValue(),
        avatarUrl,
      },
      role,
    };
  }
}
