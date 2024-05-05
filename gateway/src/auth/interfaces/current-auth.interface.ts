import { User } from '../objects/user.object';

export interface ICurrentAuth {
  user: User;

  token: string;
}
