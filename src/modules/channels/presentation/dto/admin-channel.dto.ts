import { Transform, Type } from 'class-transformer';
import { IsOptional, IsInt, IsString, IsBoolean } from 'class-validator';
import { CHANNEL_STATUS } from '../../domain/enums';

export class GetChannelsQueryArgsDto {
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  limit: number = 10;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (value === 'channelId') return 'channelId';
    if (value === 'channelName') return 'channelName';
    if (value === 'subscribers') return 'subscribers';
    if (value === 'createdAt') return 'createdAt';
    if (value === 'scheduledLives') return 'scheduledLives';

    return 'createdAt';
  })
  sortBy?:
    | 'channelId'
    | 'channelName'
    | 'subscribers'
    | 'createdAt'
    | 'scheduledLives'
    | undefined;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (value === 'asc') return 'asc';
    if (value === 'desc') return 'desc';
    return undefined;
  })
  order?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => {
    if (value === CHANNEL_STATUS.ACTIVE) return CHANNEL_STATUS.ACTIVE;
    if (value === CHANNEL_STATUS.BLOCKED) return CHANNEL_STATUS.BLOCKED;
    return undefined;
  })
  status?: CHANNEL_STATUS;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
  })
  isLive?: boolean;
}
