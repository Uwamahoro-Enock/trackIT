import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') {
  getRequest(context: any) {
    const request = GqlExecutionContext.create(context).getContext().req;
    // console.log('Request in AuthGuard:', request.headers.authorization);
    return request;
  }
}