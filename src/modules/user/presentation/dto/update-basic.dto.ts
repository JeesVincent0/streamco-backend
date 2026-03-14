import { IsDateString, IsEnum, IsString, MaxLength } from 'class-validator';
import { UserGender } from '../../domain';

export class UpdateBasicDto {
  @IsString()
  @MaxLength(10)
  displayName: string;

  @IsString()
  @MaxLength(160)
  bio?: string;

  @IsEnum(UserGender)
  gender: UserGender;

  @IsDateString()
  dob: string;
}
