import { UserGender } from '@/modules/user/domain';

type GenderMap = Record<UserGender, number>;
type AgeGroupMap = Record<string, number>;

export class ChannelAnalytics {
  private constructor(
    private _id: string,
    private _channelId: string,

    private _totalLives: number,

    private _totalViews: number,
    private _uniqueViewers: number,

    private _totalWatchTime: number,
    private _avgWatchTime: number,

    private _avgConcurrentViewers: number,

    private _viewerGenderCount: GenderMap,
    private _viewerAgeWiseCount: AgeGroupMap,
  ) {}

  // -------------------- STATIC METHODS --------------------

  static create(channelId: string, id: string): ChannelAnalytics {
    return new ChannelAnalytics(
      id,
      channelId,
      0,
      0,
      0,
      0,
      0,
      0,
      {} as GenderMap,
      {} as AgeGroupMap,
    );
  }

  static restore(data: {
    id: string;
    channelId: string;
    totalLives: number;
    totalViews: number;
    uniqueViewers: number;
    totalWatchTime: number;
    avgWatchTime: number;
    avgConcurrentViewers: number;
    viewerGenderCount: GenderMap;
    viewerAgeWiseCount: AgeGroupMap;
  }): ChannelAnalytics {
    return new ChannelAnalytics(
      data.id,
      data.channelId,
      data.totalLives,
      data.totalViews,
      data.uniqueViewers,
      data.totalWatchTime,
      data.avgWatchTime,
      data.avgConcurrentViewers,
      data.viewerGenderCount,
      data.viewerAgeWiseCount,
    );
  }

  // -------------------- GETTERS --------------------

  get channelId() {
    return this._channelId;
  }

  get totalLives() {
    return this._totalLives;
  }

  get totalViews() {
    return this._totalViews;
  }

  get uniqueViewers() {
    return this._uniqueViewers;
  }

  get totalWatchTime() {
    return this._totalWatchTime;
  }

  get avgWatchTime() {
    return this._avgWatchTime;
  }

  get avgConcurrentViewers() {
    return this._avgConcurrentViewers;
  }

  get viewerGenderCount() {
    return this._viewerGenderCount;
  }

  get viewerAgeWiseCount() {
    return this._viewerAgeWiseCount;
  }

  updateFromLive(live: {
    totalViews: number;
    uniqueViewers: number;
    totalWatchTime: number;
    avgWatchTime: number;
    avgConcurrentViewers: number;
    viewerGenderCount: GenderMap;
    viewerAgeWiseCount: AgeGroupMap;
  }) {
    this._totalLives += 1;

    this._totalViews += live.totalViews;
    this._uniqueViewers += live.uniqueViewers;
    this._totalWatchTime += live.totalWatchTime;

    // Recalculate averages
    this._avgWatchTime = Math.floor(
      this._totalWatchTime / (this._uniqueViewers || 1),
    );

    this._avgConcurrentViewers = Math.floor(
      this._totalViews / (this._totalLives || 1),
    );

    for (const key of Object.keys(live.viewerGenderCount) as UserGender[]) {
      const value = live.viewerGenderCount[key] ?? 0;

      this._viewerGenderCount[key] =
        (this._viewerGenderCount[key] ?? 0) + value;
    }

    for (const key in live.viewerAgeWiseCount) {
      this._viewerAgeWiseCount[key] =
        (this._viewerAgeWiseCount[key] || 0) + live.viewerAgeWiseCount[key];
    }
  }
}
