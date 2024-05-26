import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PermissionService } from './permission.service';
import { IUser } from './interfaces/user.interface';
import { IBaseResponse } from './common/interfaces/base-response.interface';

@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
  ) {}

  @MessagePattern('permissions_check')
  public checkPermissions(data: { user: IUser, permissions: string[] | string }):
  IBaseResponse<boolean> {
    if (!data?.user?.role || !data.permissions) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Bad Request',
      };
    }

    const isAllowed = this.permissionService.check(data.user, data.permissions);
    return {
      status: isAllowed ? HttpStatus.OK : HttpStatus.FORBIDDEN,
      message: isAllowed ? 'Success' : 'Forbidden',
      data: isAllowed,
    };
  }
}
