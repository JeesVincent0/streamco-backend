import { IdGenerator } from '../../application/ports';

export class CryptoIdGenerator extends IdGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}
