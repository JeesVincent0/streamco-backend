import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty({ message: 'Channel name is required' })
  @MaxLength(40)
  channelName: string;

  @IsString()
  @IsNotEmpty({ message: 'Channel ID is required' })
  @MaxLength(20)
  @Matches(/^[a-z0-9_]+$/, {
    message:
      'Channel ID can only contain lowercase letters, numbers, and underscores',
  })
  channelId: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio?: string;

  @IsString()
  @IsOptional()
  profileImage?: string;

  @IsString()
  @IsOptional()
  backgroundBanner?: string;
}
