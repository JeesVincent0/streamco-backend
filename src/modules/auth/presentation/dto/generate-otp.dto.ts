import { IsEmail, IsString } from 'class-validator';
import { OtpPurpose } from '../../domain/enums';

export class GenerateOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  purpose: OtpPurpose;
}
