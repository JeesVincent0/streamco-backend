import { Email, UserRole, UserStatus } from '../../domain';

export interface GetAllUsersOutput {
  id: string;
  displayName: string;
  email: Email;
  role: UserRole;
  isVerified: boolean;
  status: UserStatus;
  createdAt: Date;
}
