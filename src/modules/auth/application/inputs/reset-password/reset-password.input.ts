import { IResetPasswordPayload } from '../../../../../shared/interfaces/token-type';

export interface ResetPasswordInput {
  payload: IResetPasswordPayload;
  jwtToken: string;
  password: string;
  confirmPassword: string;
}
