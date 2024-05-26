import { UserEntity } from '../entities/user.entity';

export interface IUser extends Omit<
UserEntity,
  'password' | 'checkPassword' | 'encryptPassword'
> {}
