import { Type } from 'class-transformer';
import { VISIBILITY } from '../../../domain/enums';
import { IsString, IsNotEmpty, IsEnum, Matches, IsDate } from 'class-validator';

export class ScheduleLiveDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsEnum(VISIBILITY)
  visibility!: VISIBILITY;

  @IsString()
  description!: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  date!: Date;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'Time must be in HH:mm format' })
  time!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;

  @IsString()
  thumbnail!: string;

  @Type(() => Date)
  @IsDate()
  scheduledAt!: Date;
}
