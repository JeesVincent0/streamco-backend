import { ResetPasswordPayload } from '@/shared/interfaces/token-type';

export interface ResetPasswordInput {
  payload: ResetPasswordPayload;
  jwtToken: string;
  password: string;
  confirmPassword: string;
}
