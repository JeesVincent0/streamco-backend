import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from '../dto/auth-register.dot';

@Controller('auth')
export class AuthController {
  @Post('register')
  registerUser(@Body() dto: UserRegisterDto) {
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
