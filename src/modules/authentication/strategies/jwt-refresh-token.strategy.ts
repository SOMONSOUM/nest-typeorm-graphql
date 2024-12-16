import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('input.refreshToken'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request) {
    const token = req.body.refreshToken;
    console.log({ token });
    const { accessToken, refreshToken } = await this.authenticationService.refreshToken({ refreshToken: token });
    req.headers['Authorization'] = `Bearer ${accessToken}`;


    return { accessToken, refreshToken };
  }
}
