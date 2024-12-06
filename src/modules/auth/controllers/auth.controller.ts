import { Body, Controller, ForbiddenException, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { SigninDTO } from '../dtos';
import { AuthService } from '../services/auth.service';
import { Public } from '@shared/decorators';
import { Response, Request } from 'express';
import { JWT } from 'src/constants';
import { isEmpty } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject() private authService: AuthService
  ) { }

  @Get('/refresh')
  async refresh(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const old_refresh_token = req.cookies['refresh-token'];
      if (isEmpty(old_refresh_token)) {
        throw new ForbiddenException();
      }
      const { access_token, refresh_token } = await this.authService.refresh(old_refresh_token);
      res.setHeader('Content-Type', 'application/json');
      res.cookie('refresh-token', refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: JWT.REFRESH_TOKEN_MAX_AGE,
      });

      return res.send({
        data: {
          access_token
        }
      })
    } catch (error) {

    }
  }

  @Get('/signout')
  async signout(
    @Res() res: Response
  ) {
    res.clearCookie('refresh-token');
    return res.send();
  }

  @Post()
  @Public()
  async signin(
    @Res() res: Response,
    @Body() body: SigninDTO
  ) {
    const { access_token, refresh_token } = await this.authService.signin(body);

    res.cookie('refresh-token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: JWT.REFRESH_TOKEN_MAX_AGE,
    });

    return res.send({
      data: {
        access_token
      }
    });
  }
}