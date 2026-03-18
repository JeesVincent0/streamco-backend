import { UniqueIdService } from '@/shared/domain';
import { CATEGORY_STATUS } from '../enums/category-status.enum';

export class Category {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _slug: string,
    private _description: string,
    private _status: CATEGORY_STATUS,
    private readonly _createdAt: Date,

    private _liveCount?: number,
    private _scheduledLiveCount?: number,
    private _updatedAt?: Date,
  ) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get slug(): string {
    return this._slug;
  }

  get description(): string {
    return this._description;
  }

  get status(): CATEGORY_STATUS {
    return this._status;
  }

  get liveCount(): number {
    if (!this._liveCount || this._liveCount < 0) return 0;
    return this._liveCount;
  }

  get scheduledLiveCount(): number {
    if (!this._scheduledLiveCount || this._scheduledLiveCount < 0) return 0;
    return this._scheduledLiveCount;
  }

  get updateAt(): Date | undefined {
    if (!this._updatedAt) return undefined;
    return this._updatedAt;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  touch() {
    this._updatedAt = new Date();
  }

  setName(name: string): void {
    this._name = name;
    this.touch();
  }

  setSlug(slug: string): void {
    this._slug = slug;
    this.touch();
  }

  setDescription(description: string): void {
    this._description = description;
    this.touch();
  }

  setStatus(status: CATEGORY_STATUS): void {
    this._status = status;
    this.touch();
  }

  setLiveCount(liveCount: number): void {
    this._liveCount = liveCount;
    this.touch();
  }

  setScheduledLiveCount(scheduledLiveCount: number): void {
    this._scheduledLiveCount = scheduledLiveCount;
    this.touch();
  }

  static create({
    name,
    slug,
    description,
    status,
  }: {
    name: string;
    slug: string;
    description: string;
    status: CATEGORY_STATUS;
  }) {
    const id = UniqueIdService.generate();
    return new Category(id, name, slug, description, status, new Date());
  }

  static restore({
    id,
    name,
    slug,
    description,
    status,
    createdAt,
    updatedAt,
    liveCount,
    scheduledLiveCount,
  }: {
    id: string;
    name: string;
    slug: string;
    description: string;
    status: CATEGORY_STATUS;
    createdAt: Date;
    updatedAt: Date;
    liveCount?: number;
    scheduledLiveCount?: number;
  }) {
    return new Category(
      id,
      name,
      slug,
      description,
      status,
      createdAt,
      liveCount,
      scheduledLiveCount,
      updatedAt,
    );
  }
}
