import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AdvertiserRegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;
}
