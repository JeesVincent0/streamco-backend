import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dto/auth-register.dot';

@Controller('auth')
export class AuthController {
  @Post('register')
  register(@Body() dto: RegisterDto) {
    console.log('this is dto from register: ', dto);
    return {
      success: true,
      message: `data fetched successfully from auth controller (register)`,
      data: dto,
    };
  }
}
