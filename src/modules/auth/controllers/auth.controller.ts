import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SigninDTO } from '../dtos';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private authService: AuthService
  ) {}

  @Post()
  async signin(@Body() body: SigninDTO) {
    return this.authService.signin(body);
  }
}