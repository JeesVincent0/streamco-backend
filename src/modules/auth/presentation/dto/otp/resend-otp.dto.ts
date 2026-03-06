import { IsString } from 'class-validator';

export class ResendOtpDto {
  @IsString()
  id: string;
}
