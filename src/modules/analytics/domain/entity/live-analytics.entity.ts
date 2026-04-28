import { UserGender } from '@/modules/user/domain';
import { Duration } from '@/modules/live/domain/value-objects';

type AgeGroupMap = Record<string, number>;
type GenderMap = Record<UserGender, number>;

export class LiveAnalytics {
  private constructor(
    private _id: string,
    private _liveId: string,
    private _channelId: string,

    private _totalViews: number,
    private _uniqueViewers: number,
    private _peakConcurrentViewers: number,

    private _totalWatchTime: number,
    private _avgWatchTime: number,

    private _duration: Duration,

    private _viewerGenderCount: GenderMap,
    private _viewerAgeWiseCount: AgeGroupMap,
  ) {}

  // -------------------- STATIC METHODS --------------------

  static create(params: {
    id: string;
    liveId: string;
    channelId: string;
    duration: Duration;
  }): LiveAnalytics {
    return new LiveAnalytics(
      params.id,
      params.liveId,
      params.channelId,

      0,
      0,
      0,

      0,
      0,

      params.duration,

      {} as GenderMap,
      {} as AgeGroupMap,
    );
  }

  static restore(data: {
    id: string;
    liveId: string;
    channelId: string;
    totalViews: number;
    uniqueViewers: number;
    peakConcurrentViewers: number;
    totalWatchTime: number;
    avgWatchTime: number;
    duration: Duration;
    viewerGenderCount: GenderMap;
    viewerAgeWiseCount: AgeGroupMap;
  }): LiveAnalytics {
    return new LiveAnalytics(
      data.id,
      data.liveId,
      data.channelId,
      data.totalViews,
      data.uniqueViewers,
      data.peakConcurrentViewers,
      data.totalWatchTime,
      data.avgWatchTime,
      data.duration,
      data.viewerGenderCount,
      data.viewerAgeWiseCount,
    );
  }

  // -------------------- GETTERS --------------------

  get id() {
    return this._id;
  }

  get liveId() {
    return this._liveId;
  }

  get channelId() {
    return this._channelId;
  }

  get totalViews() {
    return this._totalViews;
  }

  get uniqueViewers() {
    return this._uniqueViewers;
  }

  get peakConcurrentViewers() {
    return this._peakConcurrentViewers;
  }

  get totalWatchTime() {
    return this._totalWatchTime;
  }

  get avgWatchTime() {
    return this._avgWatchTime;
  }

  get duration() {
    return this._duration;
  }

  get viewerGenderCount() {
    return this._viewerGenderCount;
  }

  get viewerAgeWiseCount() {
    return this._viewerAgeWiseCount;
  }

  // -------------------- DOMAIN METHODS --------------------

  incrementViews(count: number = 1) {
    this._totalViews += count;
  }

  setUniqueViewers(count: number) {
    this._uniqueViewers = count;
  }

  updatePeakConcurrent(current: number) {
    if (current > this._peakConcurrentViewers) {
      this._peakConcurrentViewers = current;
    }
  }

  addWatchTime(seconds: number) {
    this._totalWatchTime += seconds;
  }

  calculateAvgWatchTime() {
    if (this._uniqueViewers === 0) {
      this._avgWatchTime = 0;
      return;
    }
    this._avgWatchTime = Math.floor(this._totalWatchTime / this._uniqueViewers);
  }

  incrementGender(gender: UserGender) {
    this._viewerGenderCount[gender] =
      (this._viewerGenderCount[gender] || 0) + 1;
  }

  incrementAgeGroup(group: string) {
    this._viewerAgeWiseCount[group] =
      (this._viewerAgeWiseCount[group] || 0) + 1;
  }
}
