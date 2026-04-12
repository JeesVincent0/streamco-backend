import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';
import { VISIBILITY } from '../../domain/enums';

export class ScheduleLiveDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsEnum(VISIBILITY)
  visibility!: VISIBILITY;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  date!: string;

  @IsString()
  @Matches(/^\d{2}:\d{2}$/, { message: 'Time must be in HH:mm format' })
  time!: string;

  @IsString()
  @IsNotEmpty()
  duration!: string;

  @IsString()
  thumbnail?: string;
}
