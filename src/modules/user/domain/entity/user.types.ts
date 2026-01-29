import { UserGender } from '@/shared/domain/enums';
import { Email, HashedPassword } from '@/shared/domain/value-objects';

export interface CreateUserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: Email;
  password: HashedPassword;
  dob: Date;
  gender: UserGender;
}
