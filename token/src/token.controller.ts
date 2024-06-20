import { MessagePattern } from '@nestjs/microservices';
import { Controller, HttpStatus } from '@nestjs/common';
import { TokenService } from './token.service';
import { ITokenCreateResponse } from './interfaces/token-create-response.interface';

import { IBaseResponse } from './common/interfaces/base-response.interface';
import { ITokensDecodeResponse } from './interfaces/token-decode-response.interface';

@Controller()
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
  ) {}

  @MessagePattern('token_create')
  public async createToken(data: { userId: string }): Promise<ITokenCreateResponse> {
    if (!data?.userId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User ID is required',
      };
    }
    try {
      const { token } = await this.tokenService.create(data.userId);
      return {
        status: HttpStatus.OK,
        data: { token },
        message: 'Token created',
      };
    } catch (error: any) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @MessagePattern('token_delete')
  public async deleteToken(data: { userId: string }): Promise<IBaseResponse> {
    if (!data?.userId) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User ID is required',
      };
    }
    try {
      const result = await this.tokenService.delete(data.userId);
      return {
        status: HttpStatus.OK,
        message: result ? 'Token deleted' : 'Token not found',
      };
    } catch (error: any) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @MessagePattern('token_decode')
  public async decodeToken(data: { token: string }): Promise<ITokensDecodeResponse> {
    if (!data?.token) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Token is required',
      };
    }
    const tokenData = await this.tokenService.decode(data.token);
    return {
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: tokenData ? 'Token decoded' : 'Token invalid',
      data: tokenData,
    };
  }
}
