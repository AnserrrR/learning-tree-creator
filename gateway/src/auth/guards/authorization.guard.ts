import { CanActivate, ExecutionContext, HttpStatus, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { METADATA_PUBLIC_KEY } from '../decorators/public.decorator';
import { firstValueFrom } from 'rxjs';
import { MethodsPatterns } from '../../common/constants/methods-patterns';
import { IBaseResponse } from '../../common/interfaces/base-response.interface';
import { GraphQLError } from 'graphql/error';
import { Token } from '../objects/token.object';
import { User } from '../objects/user.object';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ICurrentAuth } from '../interfaces/current-auth.interface';

export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('TOKEN_SERVICE') private readonly tokenService: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(METADATA_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = GqlExecutionContext.create(context).getContext().req;

    const token = request.headers.authorization?.replace('Bearer ', '') || ''
    const tokenResponse = await firstValueFrom(
      this.tokenService.send<IBaseResponse<{ userId: string }>>(
        MethodsPatterns.decodeToken,
        { token }
      ),
    );

    if (!tokenResponse?.data?.userId || tokenResponse.status !== HttpStatus.OK) {
      throw new GraphQLError(
        tokenResponse.message,
        {
          extensions: {
            code: tokenResponse.status,
          },
        },
      );
    }

    const userResponse = await firstValueFrom(
      this.userService.send<IBaseResponse<User>>(
        MethodsPatterns.getUserById,
        { id: tokenResponse.data.userId }
      ),
    );

    if (!userResponse?.data || userResponse.status !== HttpStatus.OK) {
      throw new GraphQLError(
        userResponse.message,
        {
          extensions: {
            code: userResponse.status,
          },
        },
      );
    }
    request.user = {
      user: userResponse.data,
      token,
    } as ICurrentAuth

    return true;
  }
}
