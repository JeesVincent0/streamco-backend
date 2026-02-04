import { IsNumber, IsString } from 'class-validator';

export class otpVerificationDto {
  @IsString()
  email: string;

  @IsNumber()
  otp: number;
}
