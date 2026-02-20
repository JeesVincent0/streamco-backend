import { Request } from 'express';
import { IResetPasswordPayload } from '../application/ports/token/type';

export interface RequestWithUserInterface extends Request {
  user: IResetPasswordPayload;
  jwtToken: string;
}
