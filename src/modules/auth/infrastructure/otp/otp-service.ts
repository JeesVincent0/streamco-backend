import { OtpService } from '../../application/ports';
import crypto from 'crypto';

export class OtpGenerator implements OtpService {
  generate(): number {
    return crypto.randomInt(100000, 1000000);
  }
}
