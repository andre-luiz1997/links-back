import { UsersService } from '@modules/users/services/users.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SigninDTO } from '../dtos';
import { InvalidCredentialsException } from '@shared/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../types';
import { JwtService } from '@nestjs/jwt';
import { JWT } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject() private jwtService: JwtService
  ) { }

  async refresh(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, {secret: JWT.secret});
    const user = await this.usersService.getOne({ _id: decoded._id },true);
    if (!user) throw new InvalidCredentialsException();
    const jwtPayload: JwtPayload = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
    }

    return {
      access_token: this.jwtService.sign(jwtPayload, {secret: JWT.secret, expiresIn: JWT.ACCESS_TOKEN_EXPIRATION }),
      refresh_token: this.jwtService.sign(jwtPayload, {secret: JWT.secret, expiresIn: JWT.REFRESH_TOKEN_EXPIRATION }),
    };
  }

  async signin(body: SigninDTO) {
    const user = await this.usersService.getOne({ email: body.email },true);
    if (!user) throw new InvalidCredentialsException();
    const result = await bcrypt.compare(body.password, user.passwordHash);
    if (!result) throw new InvalidCredentialsException();
    const jwtPayload: JwtPayload = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
    }

    return {
      access_token: this.jwtService.sign(jwtPayload, {secret: JWT.secret, expiresIn: JWT.ACCESS_TOKEN_EXPIRATION }),
      refresh_token: this.jwtService.sign(jwtPayload, {secret: JWT.secret, expiresIn: JWT.REFRESH_TOKEN_EXPIRATION }),
    };
  }
}