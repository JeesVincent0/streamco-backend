// import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { GenerateOtpDto, otpVerificationDto } from '../dto';
// import { VerifyOtpUseCase } from '../../application/use-cases';
// import { GenerateOtpUseCase } from '../../application/use-cases';

// @Controller('auth/otp')
// export class OtpController {
//   constructor(
//     private readonly _generateOtpUseCase: GenerateOtpUseCase,
//     private readonly _verifyOtpUseCase: VerifyOtpUseCase,
//   ) {}

//   // OTP generation
//   @Post('generate')
//   @HttpCode(HttpStatus.OK)
//   generate(@Body() body: GenerateOtpDto) {
//     return this._generateOtpUseCase.execute({
//       email: body.email,
//       purpose: body.purpose,
//     });
//   }

//   // OTP verification
//   @Post('verify')
//   @HttpCode(HttpStatus.OK)
//   verify(@Body() dto: otpVerificationDto) {
//     return this._verifyOtpUseCase.execute({
//       id: dto.id,
//       otp: dto.otp,
//       purpose: dto.purpose,
//     });
//   }
// }
