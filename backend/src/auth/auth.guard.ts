import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public-stragegy';
import { catchError, from, map, Observable, of, switchMap, tap } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {} 
  
  canActivate(context: ExecutionContext): Observable<boolean> {
    // return true for public requests
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return of(true);
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    return from(this.jwtService.verifyAsync(
      token,
      {
        secret: jwtConstants.secret
      }
    )).pipe(
      map(payload => {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
        request['user'] = payload;
        return true;
      }),
      catchError(() => {throw new UnauthorizedException();})
    )
  } 
  
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}