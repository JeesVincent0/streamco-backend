import { OtpPurpose } from '@/modules/auth/domain';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class OtpVerificationDto {
  @IsString()
  id: string;

  @IsNumber()
  otp: number;

  @IsEnum(OtpPurpose)
  purpose: OtpPurpose;
}
