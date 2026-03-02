import { type Request } from 'express';
import { GoogleAuth } from '../../application';

export class RequestWithGoogle extends Request {
  user: GoogleAuth;
}
