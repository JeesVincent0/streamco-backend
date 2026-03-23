import { type Request } from 'express';
import { GoogleAuthInPut } from '../../application';

export class RequestWithGoogle extends Request {
  user: GoogleAuthInPut;
}
