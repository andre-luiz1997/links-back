import { UsersService } from '@modules/users/services/users.service';
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDTO } from '../dtos';
import { InvalidCredentialsException } from '@shared/exceptions';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../types';
import { JwtService } from '@nestjs/jwt';
import { JWT } from 'src/constants';
import { CreateUserDTO } from '@modules/users/dtos';
import { isEmpty } from 'class-validator';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    @Inject() private jwtService: JwtService
  ) { }

  async refresh(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, { secret: JWT.secret });
    const user = await this.usersService.getOne({ _id: decoded._id }, true);
    if (!user) throw new InvalidCredentialsException();
    const jwtPayload: JwtPayload = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
    }

    return {
      access_token: this.jwtService.sign(jwtPayload, { secret: JWT.secret, expiresIn: JWT.ACCESS_TOKEN_EXPIRATION }),
      refresh_token: this.jwtService.sign(jwtPayload, { secret: JWT.secret, expiresIn: JWT.REFRESH_TOKEN_EXPIRATION }),
    };
  }

  async signup(body: CreateUserDTO) {
    const user = await this.usersService.create(body);
    if (!user) throw new Error('auth.userCreatingError');
    return this.signin({
      email: user.email,
      password: body.password
    })
  }

  async signin(body: SigninDTO) {
    const user = await this.usersService.getOne({ email: body.email }, true);
    if (!user) throw new InvalidCredentialsException();
    const result = await bcrypt.compare(body.password, user.passwordHash);
    if (!result) throw new InvalidCredentialsException();
    const jwtPayload: JwtPayload = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
    }
    user.passwordHash = undefined;
    return {
      user,
      access_token: this.jwtService.sign(jwtPayload, { secret: JWT.secret, expiresIn: JWT.ACCESS_TOKEN_EXPIRATION }),
      refresh_token: this.jwtService.sign(jwtPayload, { secret: JWT.secret, expiresIn: JWT.REFRESH_TOKEN_EXPIRATION }),
    };
  }

  async wsSignin(client: any) {
    try {
      const handshake = client.handshake;
      const authorizationHeader = handshake.headers['authorization']?.split(' ');
      if (isEmpty(authorizationHeader)) return;
      const bearer = authorizationHeader[1];
      const decoded = this.jwtService.verify(bearer, { secret: JWT.secret });
      if (isEmpty(decoded)) return;
      return await this.usersService.getOne({ _id: new Types.ObjectId(decoded._id) });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}