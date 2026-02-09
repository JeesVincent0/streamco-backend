import { Controller, Post } from '@nestjs/common';

@Controller('otp')
export class OtpController {
  constructor() {}

  @Post('generate')
  generateOtp() {
    // Logic to generate OTP
  }
}
