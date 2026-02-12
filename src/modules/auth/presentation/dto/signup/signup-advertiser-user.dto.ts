import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupAdvertiserUserDto {
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

  @IsString()
  @IsNotEmpty()
  companyName: string;
}
