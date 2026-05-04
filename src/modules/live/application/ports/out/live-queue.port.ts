export interface ILiveQueue {
  scheduledLiveAutoCancel(liveId: string, scheduledAt: Date): Promise<void>;
  cancelScheduledJob(liveId: string): Promise<void>;
}
