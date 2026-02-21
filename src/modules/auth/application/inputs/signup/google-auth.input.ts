import { UserRole } from '@/modules/user/domain';

export interface IGoogleAuth {
  email: string;
  avatarUrl: string;
  googleId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  intent: string;
  role: UserRole.USER | UserRole.ADVERTISER;
}
