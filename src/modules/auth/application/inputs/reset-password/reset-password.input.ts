import { IResetPasswordPayload } from '../../ports/token/type';

export interface ResetPasswordInput {
  payload: IResetPasswordPayload;
  jwtToken: string;
  password: string;
  confirmPassword: string;
}
