export interface IUserCheck {
  isUserActive(userId: string): Promise<boolean>;
}
