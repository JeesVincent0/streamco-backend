import { IsString } from 'class-validator';

export class MonthlyLivesQueryDto {
  @IsString()
  year!: string;

  @IsString()
  month!: string;
}
