import { SportObjectEntity } from '../../sport-object/entities/sport-object.entity';

/**
 * Login response from remote-auth (query Login)
 */
export interface IRemoteLoginResponse {
  loggedIn: boolean;

  departments?: string[] | null;
  // departments: DepartmentEnum[],

  isSportObject?: boolean | null;

  sportObjectGroups?: string[] | null;

  email: string;

  phone?: string | null;

  sportObjects?: SportObjectEntity[];

  sportObjectIds?: string[];
}
