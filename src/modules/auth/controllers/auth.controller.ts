import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SigninDTO } from '../dtos';
import { AuthService } from '../services/auth.service';
import { Public } from '@shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private authService: AuthService
  ) {}

  @Post()
  @Public()
  async signin(@Body() body: SigninDTO) {
    return {
      accessToken: await this.authService.signin(body)
    };
  }
}