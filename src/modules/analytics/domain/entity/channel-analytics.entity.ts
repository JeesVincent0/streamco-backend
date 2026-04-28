import { UserGender } from '@/modules/user/domain';
import { GenderMap } from '../interfaces';
import { AgeGroupMap } from '../interfaces/age-interface';
import { Sponsor } from '../interfaces/sponser.interface';

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

    private _totalBidAmount: number,
    private _avgBidAmount: number,

    private _lastSponsor: {
      sponsorId: string;
      sponsorName: string;
    } | null,
  ) {}

  // -------------------- STATIC METHODS --------------------

  static create(channelId: string, id: string): ChannelAnalytics {
    return new ChannelAnalytics(
      id,
      channelId,
      0, // totalLives
      0, // totalViews
      0, // uniqueViewers
      0, // totalWatchTime
      0, // avgWatchTime
      0, // avgConcurrentViewers
      {} as GenderMap,
      {} as AgeGroupMap,
      0, // totalBidAmount
      0, // avgBidAmount
      null, // lastSponsor
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
    totalBidAmount: number;
    avgBidAmount: number;
    lastSponsor: {
      sponsorId: string;
      sponsorName: string;
    } | null;
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
      data.totalBidAmount,
      data.avgBidAmount,
      data.lastSponsor,
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

  get avgBidAmount() {
    return this._avgBidAmount;
  }

  get lastSponsor() {
    return this._lastSponsor;
  }

  // -------------------- DOMAIN METHOD --------------------

  updateFromLive(live: {
    totalViews: number;
    uniqueViewers: number;
    totalWatchTime: number;
    avgConcurrentViewers: number;
    viewerGenderCount: GenderMap;
    viewerAgeWiseCount: AgeGroupMap;
    sponsor?: Sponsor;
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

    // Merge gender
    for (const key of Object.keys(live.viewerGenderCount) as UserGender[]) {
      const value = live.viewerGenderCount[key] ?? 0;

      this._viewerGenderCount[key] =
        (this._viewerGenderCount[key] ?? 0) + value;
    }

    // Merge age
    for (const key of Object.keys(live.viewerAgeWiseCount)) {
      const value = live.viewerAgeWiseCount[key] ?? 0;

      this._viewerAgeWiseCount[key] =
        (this._viewerAgeWiseCount[key] ?? 0) + value;
    }

    // Sponsor logic
    if (live.sponsor) {
      this._totalBidAmount += live.sponsor.bidAmount;

      this._avgBidAmount = Math.floor(this._totalBidAmount / this._totalLives);

      this._lastSponsor = {
        sponsorId: live.sponsor.sponsorId,
        sponsorName: live.sponsor.sponsorName,
      };
    }
  }
}
