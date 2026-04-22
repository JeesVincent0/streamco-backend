import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Order } from '../channel-live.dto.ts';

export enum SortBy {
  CATEGORY = 'category',
  CREATED_AT = 'createdAt',
  TIME = 'scheduledAt',
  TITLE = 'title',
}

export class AdvertiserScheduledLivesDto {
  @Type(() => Number)
  @IsNumber()
  page!: number;

  @Type(() => Number)
  @IsNumber()
  limit!: number;

  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(Order)
  order?: Order;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    value === '' ? undefined : value,
  )
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }): undefined | boolean => {
    if (value === '') return undefined;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isAuctionStarted?: boolean;
}
