/**
 * Login for all response from remote-auth
 */
export interface IRemoteLoginForAllResponse {
  data: null | {
    loginForAll : {
      email: string;
      departments: string[];
    }
  }
  errors?: [{
    extensions: {
      originalError: {
        message: string;
        statusCode: number;
      }
    }
  }];
}
