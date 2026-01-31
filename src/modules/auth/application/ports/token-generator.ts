export interface TokenGenerator {
  generateToken(payload: Record<string, any>): Promise<string>;
}
