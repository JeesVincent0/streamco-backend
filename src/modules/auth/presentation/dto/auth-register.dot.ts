import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
} from 'class-validator';

import { UserGender } from '@/shared/domain/enums';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsDateString()
  dob: string;

  @IsEnum(UserGender)
  gender: UserGender;
}
