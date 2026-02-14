import { OtpServicePort } from '../../application/ports';
import crypto from 'crypto';

export class OtpGenerator implements OtpServicePort {
  generate(): number {
    return crypto.randomInt(100000, 1000000);
  }
}
