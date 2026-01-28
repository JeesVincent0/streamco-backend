export abstract class TokenGenerator {
  abstract generateToken(payload: Record<string, any>): Promise<string>;
}
