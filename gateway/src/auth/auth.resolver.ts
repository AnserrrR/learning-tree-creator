import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { HttpStatus, Inject } from '@nestjs/common';
import { User } from './objects/user.object';
import { MethodsPatterns } from '../common/constants/methods-patterns';
import { IBaseResponse } from '../common/interfaces/base-response.interface';
import { firstValueFrom } from 'rxjs';
import { GraphQLError } from 'graphql/error';
import { Public } from './decorators/public.decorator';
import { CurrentAuth } from './decorators/current-auth.decorator';
import { MethodPermissions } from './decorators/method-permissions.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('TOKEN_SERVICE') private readonly tokenService: ClientProxy,
  ) {}

  @Query(() => User, { description: 'Get user by ID' })
  async getCurrentUser(@CurrentAuth('user') user: User): Promise<User> {
    return user;
  }

  @Public()
  @Mutation(() => String, { description: 'Register user' })
  async register(@Args('email') email: string, @Args('password') password: string): Promise<string> {
    const userResponse = await firstValueFrom(
      this.userService.send<IBaseResponse<User>>(MethodsPatterns.createUser, { email, password }),
    );
    if (userResponse.status !== HttpStatus.CREATED || !userResponse.data) {
      throw new GraphQLError(
        userResponse.message,
        {
          extensions: {
            code: userResponse.status,
          },
        },
      );
    }

    const tokenResponse = await firstValueFrom(
      this.tokenService.send<IBaseResponse<{ token: string }>>(
        MethodsPatterns.createToken,
        { userId: userResponse.data.id }
      ),
    );
    if (tokenResponse.status !== HttpStatus.OK || !tokenResponse.data) {
      throw new GraphQLError(
        tokenResponse.message,
        {
          extensions: {
            code: tokenResponse.status,
          },
        },
      );
    }
    return tokenResponse.data.token;
  }

  @Public()
  @Mutation(() => String, { description: 'Login user' })
  async login(@Args('email') email: string, @Args('password') password: string): Promise<string> {
    const userResponse = await firstValueFrom(
      this.userService.send<IBaseResponse<User>>(
        MethodsPatterns.getUserByCredentials,
        { email, password }
      ),
    );
    if (userResponse.status !== HttpStatus.OK || !userResponse.data) {
      throw new GraphQLError(
        userResponse.message,
        {
          extensions: {
            code: userResponse.status,
          },
        },
      );
    }

    const tokenResponse = await firstValueFrom(
      this.tokenService.send<IBaseResponse<{ token: string }>>(
        MethodsPatterns.createToken,
        { userId: userResponse.data.id }
      ),
    );
    if (tokenResponse.status !== HttpStatus.OK || !tokenResponse.data) {
      throw new GraphQLError(
        tokenResponse.message,
        {
          extensions: {
            code: tokenResponse.status,
          },
        },
      );
    }
    return tokenResponse.data.token;
  }

  @MethodPermissions(MethodsPatterns.deleteToken)
  @Mutation(() => Boolean, { description: 'Logout user' })
  async logout(@CurrentAuth('user') user: User): Promise<boolean> {
    const response = await firstValueFrom(
      this.tokenService.send<IBaseResponse>(MethodsPatterns.deleteToken, {
        userId: user.id,
      }),
    );
    if (response.status !== HttpStatus.OK) {
      throw new GraphQLError(
        response.message,
        {
          extensions: {
            code: response.status,
          },
        },
      );
    }
    return true;
  }
}
