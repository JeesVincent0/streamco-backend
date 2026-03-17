import { IsString, MaxLength } from 'class-validator';

export class SocialLinksDto {
  @IsString()
  @MaxLength(100)
  instagram: string;

  @IsString()
  @MaxLength(100)
  facebook: string;

  @IsString()
  @MaxLength(100)
  youtube: string;

  @IsString()
  @MaxLength(100)
  x: string;
}
