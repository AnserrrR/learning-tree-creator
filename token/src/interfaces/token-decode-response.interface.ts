import { IBaseResponse } from '../common/interfaces/base-response.interface';

export interface ITokensDecodeResponse extends IBaseResponse {
  data?: {
    userId: string;
  };
}
