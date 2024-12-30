import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
    });

    console.log('reaching the jwt strategy')
  }

  async validate(payload: any) {
    console.log('Token Payload Received: ......  ', payload);
  
    if (!payload || !payload.id || !payload.email) {
      console.error('Invalid token payload:', payload);
      throw new UnauthorizedException('Invalid token payload');
    }
  
    // Return the user payload if valid
    return { id: payload.id, email: payload.email, role:payload.role };
  }

}
