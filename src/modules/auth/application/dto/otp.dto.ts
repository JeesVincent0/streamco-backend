import { IsNumber, IsString } from 'class-validator';

export class OtpDto {
  @IsString()
  email: string;

  @IsNumber()
  otp: number;
}
