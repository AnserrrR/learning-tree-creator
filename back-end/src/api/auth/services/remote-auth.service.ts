import {
  HttpStatus, Injectable, InternalServerErrorException, Logger, ServiceUnavailableException, UnauthorizedException,
} from '@nestjs/common';
import axios, { AxiosError, isAxiosError } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { uniq } from 'lodash';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { SportObjectEntity } from '../../sport-object/entities/sport-object.entity';
import { LOGIN_FOR_ALL_QUERY, REMOTE_LOGIN_REQUEST_GQL } from '../auth-module.constants';
import { IRemoteLoginResponse } from '../interfaces/remote-login-resonse.interface';
import { groupsMock } from './groups.mock';
import { ConfigService } from '../../../config/config.service';
import { IRemoteLoginForAllResponse } from '../interfaces/remote-login-for-all-resonse.interface';

/**
 * Service for remote LDAP authentication
 */
@Injectable()
export class RemoteAuthService {
  constructor(
    @InjectRepository(SportObjectEntity) private sportObjectRepository: typeof SportObjectEntity,
    private readonly configService: ConfigService,
  ) {}

    private readonly logger = new Logger(RemoteAuthService.name);

    /**
     * Login user by remote LDAP checking sport object groups
     * @param input - login and password
     * @return response from remote LDAP
     * @deprecated Works but need login without groups checking. This can probably be deleted.
     */
    async login(input: { login: string, password: string }): Promise<IRemoteLoginResponse> {
      const sportObjects = await this.sportObjectRepository.find();
      // TODO: Uncomment this when Sport objects will be filled in DB
      const sportObjectGroups = sportObjects
        .map((sportObject) => sportObject.activeDirectoryGroup)
        .filter((item) => !!item);

      const loginData = await axios.post(this.configService.config.remoteAuthGqlUrl, {
        query: REMOTE_LOGIN_REQUEST_GQL,
        variables: {
          input: {
            sportObjectGroups: uniq(sportObjectGroups.concat(groupsMock)),
            password: input.password,
            login: input.login,
          },
        },
      }).then((res) => res.data.data.login as IRemoteLoginResponse)
        .catch((error: AxiosError) => {
          if (isAxiosError(error)) {
            if (error.code === 'ENOTFOUND') {
              throw new ServiceUnavailableException('Remote authorization service unavailable');
            }
            if (error.response?.status === HttpStatus.UNAUTHORIZED) {
              throw new UnauthorizedException('Unauthorized');
            }
            if (error.response?.status === HttpStatus.BAD_REQUEST) {
              throw new InternalServerErrorException('Broken remote authorization request');
            }
          }
          throw error;
        });

      if (!loginData.loggedIn || !loginData.email) {
        throw new UnauthorizedException('Unauthorized');
      }

      loginData.sportObjects = sportObjects.filter(
        (sportObject) => loginData.sportObjectGroups?.find(
          (sportObjectGroup) => sportObjectGroup === sportObject.activeDirectoryGroup,
        ),
      );
      loginData.sportObjectIds = loginData.sportObjects.map((item) => item.id);

      return loginData;
    }

    /**
   * Login user by remote LDAP without checking sport object groups
   * @param input - login and password
   * @return login data
   * @throws UnauthorizedException - Credentials are invalid
   * @throws ServiceUnavailableException - Remote authorization service incorrect response
   * @throws ServiceUnavailableException - Remote authorization service unavailable
   * @throws ServiceUnavailableException - Remote authorization service unknown error
   * @throws InternalServerErrorException - Broken remote authorization request
   */
    async loginForAll(input: { login: string, password: string }) {
      return axios.post<IRemoteLoginForAllResponse>(this.configService.config.remoteAuthGqlUrl, {
        query: LOGIN_FOR_ALL_QUERY,
        variables: { input },
      }).then(({ data: gqlResponse }) => {
        const loginData = gqlResponse.data?.loginForAll;
        const errorGraphQL = gqlResponse.errors?.[0];
        const errorOriginal = errorGraphQL?.extensions.originalError;
        if (errorOriginal?.statusCode === HttpStatus.UNAUTHORIZED) {
          throw new UnauthorizedException();
        }
        if (errorGraphQL || !loginData) {
          this.logger.error(`Remote authorization service incorrect response: ${JSON.stringify(gqlResponse)}`);
          throw new ServiceUnavailableException('Remote authorization service unavailable');
        }
        return loginData;
      }).catch((error: AxiosError | HttpException) => {
        if (error instanceof HttpException) {
          throw error;
        }
        if (isAxiosError(error)) {
          if (error.code === 'ENOTFOUND') {
            this.logger.error(`Remote authorization service unavailable, error: ${JSON.stringify(error)}`);
            throw new ServiceUnavailableException('Remote authorization service unavailable');
          }
          if ([error.response?.status, error.status].includes(HttpStatus.UNAUTHORIZED)) {
            throw new UnauthorizedException();
          }
          if ([error.response?.status, error.status].includes(HttpStatus.BAD_REQUEST)) {
            this.logger.error(`Remote authorization broken request, error: ${JSON.stringify(error)}`);
            throw new InternalServerErrorException('Broken remote authorization request');
          }
        }
        this.logger.error(`Remote authorization service unknown error: ${JSON.stringify(error)}`);
        throw new ServiceUnavailableException('Remote authorization service unavailable');
      });
    }
}
