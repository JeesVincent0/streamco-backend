import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from '../dto/auth-register.dot';
import { FileLogger } from '@/common/logger/file-logger';

@Controller('auth')
export class AuthController {
  constructor(private readonly logger: FileLogger) {}
  @Post('register')
  registerUser(@Body() dto: UserRegisterDto) {
    this.logger.debug(process.env.SAMPLE_VALUE);
    return {
      success: true,
      message: `data fetched successfully from auth controller (register)`,
      data: dto,
    };
  }

  @Post('register/advertiser')
  registerAdvertiser() {
    return `hello, this is from advertiser`;
  }
}
