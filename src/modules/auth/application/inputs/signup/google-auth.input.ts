import { UserRole } from '@/modules/user/domain';

export interface GoogleAuth {
  email: string;
  avatarUrl: string;
  googleId: string;
  firstName: string;
  lastName: string;
  displayName: string;
  intent: string;
  role: UserRole.USER | UserRole.ADVERTISER;
}
