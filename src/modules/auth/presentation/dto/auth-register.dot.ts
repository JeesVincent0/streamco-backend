import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
} from 'class-validator';

import { UserRole, UserGender } from '@/shared/domain/enums';

export class RegisterDto {
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsDateString()
  dob: string;

  @IsEnum(UserGender)
  gender: UserGender;
}
