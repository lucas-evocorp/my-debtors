import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IUserAuth as IUserAuthResponse } from 'src/core/interfaces/user-auth.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface Ipayload {
  sub: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY_JWT,
    });
  }

  async validate(payload: Ipayload): Promise<IUserAuthResponse> {
    return { userId: payload.sub, username: payload.username };
  }
}
