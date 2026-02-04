import { Email, HashedPassword } from '@/modules/user/domain/value-objects';
import { UserRole } from '../enums';

export interface CreateAdvertiserProps {
  firstName: string;
  lastName: string;
  email: Email;
  password: HashedPassword;
  companyName: string;
  role: UserRole;
}
