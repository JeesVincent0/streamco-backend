import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
} from 'class-validator';

import { UserGender } from '@/modules/user/domain/enums';

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

  @IsString()
  confirmPassword: string;

  @IsDateString()
  dob: string;

  @IsEnum(UserGender)
  gender: UserGender;
}
