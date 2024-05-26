import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserRoleEnum } from './enums/user-role.enum';
import { UserPermissions, AdminPermissions } from './permissions';

@Injectable()
export class PermissionService {
  public check(user: IUser, permissions: string[] | string): boolean {
    const permissionsArray = Array.isArray(permissions)
      ? permissions
      : [permissions];

    if (user.role === UserRoleEnum.Admin) {
      return permissionsArray.every((permission) => AdminPermissions.includes(permission));
    }

    return permissionsArray.every((permission) => UserPermissions.includes(permission));
  }
}
