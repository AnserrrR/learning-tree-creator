import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICurrentAuth } from '../interfaces/current-auth.interface';
import { JwtTypeEnum } from '../enums/jwt-type.enum';
import { METADATA_JWTTYPE_KEY } from '../decorators/jwt-type.decorator';

/**
 * Guard for checking current authorization jwt type
 */
@Injectable()
export class JwtTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  /**
   * Automatically called method for checking jwt type of the current authorization
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredJwtTypes = this.reflector.getAllAndOverride<JwtTypeEnum[] | undefined>(METADATA_JWTTYPE_KEY, [
      context.getClass(), context.getHandler(),
    ]);
    const currentAuth = GqlExecutionContext.create(context).getContext().req.user as ICurrentAuth | undefined;
    return !requiredJwtTypes || (!!currentAuth && requiredJwtTypes.includes(currentAuth.jwtPayload.type));
  }
}
