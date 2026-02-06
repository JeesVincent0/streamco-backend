import { IsNumber, IsString } from 'class-validator';

export class otpVerificationDto {
  @IsString()
  id: string;

  @IsNumber()
  otp: number;
}
