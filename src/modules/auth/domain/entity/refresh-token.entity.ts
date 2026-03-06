/*
 * @description : This is the RefreshToken entity which represents the refresh token in the system.
 * It contains the userId, jti, revoked, createdAt and expiresAt properties.
 * The create method is used to create a new instance of the RefreshToken entity.
 */

export class RefreshToken {
  constructor(
    public userId: string,
    public jti: string,
    public revoked: boolean,
    public createdAt: Date,
    public expiresAt: Date,
  ) {}

  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get isActive(): boolean {
    return !this.revoked && !this.isExpired;
  }

  get timeToLive(): number {
    const currentTime = new Date();
    const ttl = this.expiresAt.getTime() - currentTime.getTime();
    return ttl > 0 ? ttl : 0;
  }

  static create(
    userId: string,
    jti: string,
    revoked: boolean,
    createdAt: Date,
    expiresAt: Date,
  ) {
    return new RefreshToken(userId, jti, revoked, createdAt, expiresAt);
  }
}
