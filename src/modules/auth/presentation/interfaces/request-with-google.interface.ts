import { type Request } from 'express';
import { IGoogleAuth } from '../../application/inputs/signup/google-auth.input';

export class RequestWithGoogle extends Request {
  user: IGoogleAuth;
}
