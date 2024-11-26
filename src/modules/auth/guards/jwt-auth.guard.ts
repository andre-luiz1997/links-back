import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../types';
import { UsersService } from '@modules/users/services/users.service';
import { IS_PUBLIC_KEY } from '@shared/decorators';
import { CustomRequest } from '@shared/types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublicURL = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const req: CustomRequest = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    const token = req.headers.authorization;
    req.user = null;
    if (!token && !isPublicURL) throw new UnauthorizedException();
    if (!token && isPublicURL) return true;
    const userData = await this.authenticate({ token, res });
    if(!userData) throw new UnauthorizedException();
    req.user = userData;
    return true;
  }

  private async getLoggedUser(payload: JwtPayload) {
    const user = await this.usersService.getById(payload._id);
    if (!user) return null;
    return user;
  }

  private async authenticate(props: {
    token: string;
    isPublic?: boolean;
    res?: Response
  }) {
    const bearer = props.token ? props.token.split('Bearer ')[1] : null;
    try {
      const payload: JwtPayload = await this.jwtService.verify(bearer);
      const userData = await this.getLoggedUser(payload);
      if (!userData) throw new UnauthorizedException();
      return userData;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
