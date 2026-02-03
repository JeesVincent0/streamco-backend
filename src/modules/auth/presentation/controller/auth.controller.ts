import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from '../dto/auth-register.dot';
import { FileLogger } from '@/shared/logger/file-logger';
import { RegisterUserUseCase } from '../../application/use-cases/user-register.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly logger: FileLogger,
    private readonly registerUseCase: RegisterUserUseCase,
  ) {}
  @Post('register')
  registerUser(@Body() dto: UserRegisterDto) {
    this.logger.debug('data reached');
    return this.registerUseCase.execute(dto);
  }

  @Post('register/advertiser')
  registerAdvertiser() {
    return `hello, this is from advertiser`;
  }
}
