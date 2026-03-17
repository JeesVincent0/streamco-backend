import { GenerateOtpPort } from '@/shared/application/ports';
import crypto from 'crypto';

export class GenerateOtpImplCrypto implements GenerateOtpPort {
  execute(): number {
    return crypto.randomInt(100000, 1000000);
  }
}
