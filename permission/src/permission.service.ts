import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UserRoleEnum } from './enums/user-role.enum';
import { UserPermissions, AdminPermissions } from './permissions';

@Injectable()
export class PermissionService {
  public check(user: IUser, permissions: string[] | string): boolean {
    if (typeof permissions === 'string') {
      permissions = [permissions];
    }

    if (user.role === UserRoleEnum.Admin) {
      return permissions.every((permission) => AdminPermissions.includes(permission));
    }

    return permissions.every((permission) => UserPermissions.includes(permission));
  }
}
