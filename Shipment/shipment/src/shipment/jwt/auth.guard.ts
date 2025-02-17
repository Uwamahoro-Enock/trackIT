import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  getRequest(context: any) {
    const request = GqlExecutionContext.create(context).getContext().req;
    if(!request.headers.authorization) {
      throw new UnauthorizedException('Authorization token is required. Please Log in Or pass in valid token in your header')
    }
    // console.log('Request in AuthGuard:', request.headers.authorization);
    return request;
  }
}