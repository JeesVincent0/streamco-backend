import { Request } from 'express';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  IResetPasswordPayload,
} from '../../application/ports/token/type';

export interface RequestWithUserInterface extends Request {
  user: IResetPasswordPayload | IRefreshTokenPayload | IAccessTokenPayload;
  jwtToken: string;
}
