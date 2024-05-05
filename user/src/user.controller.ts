import { Controller, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { IUserResponse } from './interfaces/user-response.interface';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @MessagePattern('user_get_by_id')
  public async getUserById(data: { id: string }): Promise<IUserResponse> {
    if (!data?.id) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User ID is required',
      };
    }

    try {
      const user = await this.userService.getById(data.id);
      return {
        status: HttpStatus.OK,
        message: 'User found',
        data: user
      };
    } catch (error: any) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  @MessagePattern('user_get_by_credentials')
  public async getUserByCredentials(data: { email: string, password: string }): Promise<IUserResponse> {
    if (!data?.email || !data?.password) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Email and password are required',
      };
    }

    try {
      const user = await this.userService.getByCredentials(data);
      return {
        status: HttpStatus.OK,
        message: 'User found',
        data: user
      };
    } catch (error: any) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: error.message,
      };
    }
  }

  @MessagePattern('user_create')
  public async createUser(data: { email: string, password: string }): Promise<IUserResponse> {
    if (!data?.email || !data?.password) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Email and password are required',
      };
    }

    try {
      const user = await this.userService.create(data);
      return {
        status: HttpStatus.CREATED,
        message: 'User created',
        data: user
      };
    } catch (error: any) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }
}
