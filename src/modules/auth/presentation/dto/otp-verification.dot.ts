import { IsNumber, IsString } from 'class-validator';
import { OtpPurpose } from '../../domain/enums';

export class otpVerificationDto {
  @IsString()
  id: string;

  @IsNumber()
  otp: number;

  @IsString()
  purpose: OtpPurpose;
}
