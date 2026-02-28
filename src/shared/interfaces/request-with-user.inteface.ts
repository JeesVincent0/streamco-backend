import { Request } from 'express';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  IResetPasswordPayload,
} from '@/shared/interfaces/token-type';

export interface RequestWithUserInterface extends Request {
  user: IResetPasswordPayload | IRefreshTokenPayload | IAccessTokenPayload;
  jwtToken: string;
}
