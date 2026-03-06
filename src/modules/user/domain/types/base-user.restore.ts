import { UserRole, UserStatus } from '../enums';

export interface BaseUserRestoreProps {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isProfileCompleted: boolean;
  status: UserStatus;
  createdAt: Date;
  googleId?: string;
  avatarUrl?: string;
  updatedAt?: Date;
  deletedAt?: Date;
}
