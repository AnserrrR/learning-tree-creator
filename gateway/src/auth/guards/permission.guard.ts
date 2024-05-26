import {
  CanActivate, ExecutionContext, HttpStatus, Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { firstValueFrom } from 'rxjs';
import { GraphQLError } from 'graphql/error';
import { METADATA_PERMISSIONS_KEY } from '../decorators/method-permissions.decorator';
import { ICurrentAuth } from '../interfaces/current-auth.interface';
import { MethodsPatterns } from '../../common/constants/methods-patterns';
import { IBaseResponse } from '../../common/interfaces/base-response.interface';
import { METADATA_PUBLIC_KEY } from '../decorators/public.decorator';

export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('PERMISSION_SERVICE') private readonly permissionService: ClientProxy,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(METADATA_PUBLIC_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (isPublic) {
      return true;
    }

    const permissions = this.reflector.getAllAndOverride<string[] | string>(METADATA_PERMISSIONS_KEY, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!permissions) {
      return true;
    }

    const request = GqlExecutionContext.create(context).getContext().req;
    const currentAuth = request.user as ICurrentAuth;

    if (!currentAuth?.user) {
      return false;
    }

    const response = await firstValueFrom(
      this.permissionService.send<IBaseResponse<boolean>>(
        MethodsPatterns.checkPermissions,
        {
          user: currentAuth.user,
          permissions,
        },
      ),
    );

    if (response.status !== HttpStatus.OK || !response.data) {
      throw new GraphQLError(
        response.message,
        {
          extensions: {
            code: response.status,
          },
        },
      );
    }

    return response.data;
  }
}
