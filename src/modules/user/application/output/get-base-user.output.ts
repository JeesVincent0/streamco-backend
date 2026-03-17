import { UserRole } from '../../domain';

export interface IGetBaseUserOutput {
  user: {
    id: string;
    displayName: string;
    email: string;
    avatarUrl?: string;
  };
  role: UserRole;
}
