import { registerEnumType } from '@nestjs/graphql';

/**
 * User roles
 */
export enum UserRoleEnum {
  Admin = 'Admin',
  User = 'User',
}
registerEnumType(UserRoleEnum, {
  name: 'UserRole',
  description: 'User roles',
});
