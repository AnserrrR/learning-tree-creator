import { IBaseResponse } from '../common/interfaces/base-response.interface';

export interface ITokenCreateResponse extends IBaseResponse {
  data?: {
    token: string;
  };
}
