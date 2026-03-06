import { Request } from 'express';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  ResetPasswordPayload,
} from '@/shared/interfaces/token-type';

export interface RequestWithUserInterface extends Request {
  user: ResetPasswordPayload | RefreshTokenPayload | AccessTokenPayload;
  jwtToken: string;
}
