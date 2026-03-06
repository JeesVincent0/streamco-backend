import { Email } from '../value-objects';

export interface CreateAdvertiserWithGoogleAuthProps {
  firstName: string;
  lastName: string;
  email: Email;
  displayName: string;
}
