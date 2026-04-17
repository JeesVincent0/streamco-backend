import {
  Min,
  IsIn,
  IsInt,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';

import { LIVESTATUS } from '../../domain/enums';
import { Type, Transform } from 'class-transformer';

export enum SortBy {
  CREATED_AT = 'createdAt',
  TIME = 'time',
  TITLE = 'title',
}

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

type AllowedStatus = LIVESTATUS.SCHEDULED | LIVESTATUS.CANCELLED;

const ALLOWED_STATUS = [LIVESTATUS.SCHEDULED, LIVESTATUS.CANCELLED];

export class GetScheduledLivesDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

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
  @IsIn(ALLOWED_STATUS)
  status?: AllowedStatus;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    value === '' ? undefined : value,
  )
  @IsString()
  search?: string;
}
