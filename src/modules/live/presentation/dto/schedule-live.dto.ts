import {
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

import { Transform, Type } from 'class-transformer';
import { LIVESTATUS, VISIBILITY } from '../../domain/enums';

export class ScheduleLiveDto {
  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;

  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  channelId!: string;

  @IsEnum(VISIBILITY)
  @IsNotEmpty()
  visibility!: VISIBILITY;

  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description!: string;

  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  categoryId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  thumbnail!: string;

  @Type(() => Number)
  @IsNumber()
  expectedDuration!: number;
}
