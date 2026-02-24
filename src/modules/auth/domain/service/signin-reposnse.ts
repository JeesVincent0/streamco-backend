import { UserRole } from '@/modules/user/domain/enums';
import { Email } from '@/modules/user/domain/value-objects';

export class ResponseData {
  static getDate(
    id: string,
    displayName: string,
    email: Email,
    role: UserRole,
  ) {
    return {
      user: {
        id,
        displayName,
        email: email.getValue(),
      },
      role,
    };
  }
}
