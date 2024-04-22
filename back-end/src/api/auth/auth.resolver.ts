import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  InternalServerErrorException, Logger, UnauthorizedException, UseGuards,
} from '@nestjs/common';
import { Public } from './decorators/public.decorator';
import { AuthService } from './services/auth.service';
import { JwtTypeEnum } from './enums/jwt-type.enum';
import { CurrentAuth } from './decorators/current-auth.decorator';
import { ICurrentAuth } from './interfaces/current-auth.interface';
import { JwtType } from './decorators/jwt-type.decorator';
import { JwtTypeGuard } from './guards/jwt-type.guard';
import { ConfigService } from '../../config/config.service';

/**
 * Resolver for users login and logout.
 */
@Resolver()
@UseGuards(JwtTypeGuard)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Auth by remote service and upsert user in database.
   * If remote service not available -> auth by database.
   * @param login - User login.
   * @param password - User password.
   * @returns JWT.
   */
  @Mutation(() => String, {
    description: 'Returns JWT. Tries auth by remote service or database.',
  })
  @Public()
  async loginByPassword(
    @Args('login') login: string,
    @Args('password') password: string,
  ): Promise<string> {
    const isTryRemote = this.configService.isMode.prod;
    let remoteError: Error | null = null;
    const userEntity = (isTryRemote && await this.authService.checkUserThoughRemoteAuth({ login, password }).catch((err: Error) => {
      if (err instanceof UnauthorizedException) {
        throw err;
      }
      remoteError = err;
      this.logger.error('Trying auth through database, because remote auth error:', err);
    })) || await this.authService.checkUserThoughDatabase({ login, password }).catch((err: Error) => {
      this.logger.warn('Database auth error:', err);
      throw remoteError || err;
    });
    if (!userEntity.jwtKey) {
      userEntity.jwtKey = await this.authService.generateJwtKey();
      await userEntity.save();
    }
    return this.authService.generateAccessToken({
      id: userEntity.id,
      type: JwtTypeEnum.UserAuthToken,
      key: userEntity.jwtKey,
    });
  }

  /**
   * Logout and invalidate all previously created JWTs.
   * @param auth - Current auth.
   */
  @Mutation(() => Boolean, {
    description: 'Logout and invalidate all previously created JWTs',
  })
  @JwtType(JwtTypeEnum.UserAuthToken)
  async logout(@CurrentAuth() auth: ICurrentAuth): Promise<boolean> {
    if (!auth.user.id) {
      throw new InternalServerErrorException('User ID not found');
    }
    await this.authService.userLogout(auth.user.id);
    return true;
  }
}
