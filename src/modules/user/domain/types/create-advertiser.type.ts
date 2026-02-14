import { Email, HashedPassword } from '@/modules/user/domain/value-objects';

export interface CreateAdvertiserProps {
  firstName: string;
  lastName: string;
  email: Email;
  password: HashedPassword;
  companyName: string;
}
