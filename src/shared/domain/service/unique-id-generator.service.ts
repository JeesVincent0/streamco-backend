export class UniqueIdService {
  static generate() {
    return crypto.randomUUID();
  }
}
