export interface IRefreshAccessTokenUseCase {
  execute(userId: string): Promise<string>;
}
