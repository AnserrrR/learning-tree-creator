import { UserRoleEnum } from '../enums/user-role.enum';

export interface IUser {
  id: string;
  email: string;
  role: UserRoleEnum;
}
