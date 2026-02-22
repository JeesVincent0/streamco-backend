import { Email, HashedPassword } from '@/modules/user/domain/value-objects';

export interface CreateAdvertiserProps {
  firstName: string;
  lastName: string;
  email: Email;
  isProfileCompleted: boolean;
  isVerified?: boolean;
  displayName?: string;
  password?: HashedPassword;
  companyName?: string;
}
