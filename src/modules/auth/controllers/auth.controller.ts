import { Body, Controller, ForbiddenException, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { SigninDTO } from '../dtos';
import { AuthService } from '../services/auth.service';
import { Public } from '@shared/decorators';
import { Response, Request } from 'express';
import { JWT } from 'src/constants';
import { isEmpty } from 'class-validator';
import { CreateUserDTO } from '@modules/users/dtos';
import { UsersEntity } from '@modules/users/entities/users.entity';

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
  @Public()
  async signout(
    @Res() res: Response
  ) {
    res.clearCookie('refresh-token');
    return res.send();
  }

  private sign(response: Response, user: UsersEntity, access_token: string, refresh_token: string) {
    response.cookie('refresh-token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: JWT.REFRESH_TOKEN_MAX_AGE,
    });

    return response.send({
      data: {
        access_token,
        user
      }
    });
  }

  @Post("/signup")
  @Public()
  async signup(
    @Res() res: Response,
    @Body() body: CreateUserDTO
  ) {
    const { access_token, refresh_token, user } = await this.authService.signup(body);
    return this.sign(res, user, access_token, refresh_token);
  }

  @Post()
  @Public()
  async signin(
    @Res() res: Response,
    @Body() body: SigninDTO
  ) {
    const { access_token, refresh_token, user } = await this.authService.signin(body);
    return this.sign(res, user, access_token, refresh_token);
  }
}