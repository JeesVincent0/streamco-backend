export interface UpdateUserStatusPort {
  execute(userId: string, newStatus: string): Promise<void>;
}
