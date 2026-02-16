import { IsNumber, IsString } from 'class-validator';

export class VerifyResetPasswordOtpDto {
  @IsString()
  id: string;
  @IsNumber()
  otp: number;
}
