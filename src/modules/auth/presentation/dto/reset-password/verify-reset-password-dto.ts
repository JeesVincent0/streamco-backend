import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class VerifyResetPasswordOtpDto {
  @IsString()
  id!: string;

  @Type(() => Number)
  @IsNumber()
  otp!: number;
}
