import { Body, Controller, Post } from '@nestjs/common';
import { GenerateOtpUseCase } from '../../application/use-cases/generate-otp.usecase';
import { GenerateOtpDto } from '../dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly _generateOtpUseCase: GenerateOtpUseCase) {}

  @Post('generate')
  generateOtp(@Body() body: GenerateOtpDto) {
    return this._generateOtpUseCase.execute({
      email: body.email,
      purpose: body.purpose,
    });
  }
}
