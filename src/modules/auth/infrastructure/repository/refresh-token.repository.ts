import { RefreshTokenPort } from '../../application/ports/token';
import { RefreshToken } from '../../domain/entity';
import { RefreshTokenDocument } from '../schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class MonogodbRefreshTokenRepository implements RefreshTokenPort {
  constructor(
    @InjectModel('RefreshToken')
    private readonly _refreshTokenDocument: Model<RefreshTokenDocument>,
  ) {}

  // This method will save the refresh token to the database
  async save(refreshToken: RefreshToken): Promise<void> {
    await this._refreshTokenDocument.create(refreshToken);
  }
  async findByJti(jti: string): Promise<RefreshToken | null> {
    const doc = await this._refreshTokenDocument.findOne({ jti });
    if (!doc) {
      return null;
    }
    return RefreshToken.create(
      doc.userId,
      doc.jti,
      doc.revoked,
      doc.createdAt,
      doc.expiresAt,
    );
  }
  async revokeAllTokenByUserId(userId: string): Promise<void> {
    await this._refreshTokenDocument.updateMany(
      { userId },
      { $set: { revoked: true } },
    );
  }
  async revokeToken(jti: string): Promise<void> {
    await this._refreshTokenDocument.updateOne(
      { jti },
      { $set: { revoked: true } },
    );
  }
}
