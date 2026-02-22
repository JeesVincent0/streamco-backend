import { UserGender } from '@/modules/user/domain/enums';
import { Email, HashedPassword } from '@/modules/user/domain/value-objects';

export interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: Email;
  password: HashedPassword;
  dob: Date;
  gender: UserGender;
  isProfileCompleted: boolean;
}
