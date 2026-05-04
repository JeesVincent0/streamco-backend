import { IsString } from 'class-validator';

export class DayLivesQueryDto {
  @IsString()
  date!: string;
}
