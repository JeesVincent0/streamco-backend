import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserGender } from '../../domain';

export class UpdateBasicDto {
  @IsString()
  @MaxLength(30)
  displayName: string;

  @IsString()
  @MaxLength(160)
  @IsOptional()
  bio?: string;

  @IsEnum(UserGender)
  @IsOptional()
  gender: UserGender;

  @IsDateString()
  @IsOptional()
  dob: string;

  @IsString()
  @IsOptional()
  companyName?: string;
}
