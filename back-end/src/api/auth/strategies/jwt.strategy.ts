/* eslint-disable no-case-declarations */
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '../../../config/config.service';
import { UserDocuBackEntity } from '../../user/entities/user-docu-back.entity';
import { ICurrentAuth } from '../interfaces/current-auth.interface';
import { JwtTypeEnum } from '../enums/jwt-type.enum';
import { ApiTokenEntity } from '../../api-token/api-token.entity';

/**
 * Strategy for authorization by JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService,
      @InjectRepository(UserDocuBackEntity) private readonly userRepository: Repository<UserDocuBackEntity>,
      @InjectRepository(ApiTokenEntity) private readonly apiTokenRepository: Repository<ApiTokenEntity>,
    ) {
    super({
      secretOrKey: configService.config.jwtToken.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Method automatically callable after access token
   *    validation for additional checks of the current session.
   */
  async validate(payload: IJwtPayload, done: Function): Promise<ICurrentAuth> {
    switch (payload.type) {
      case JwtTypeEnum.UserAuthToken:
        const user = await this.userRepository.findOneByOrFail({ id: payload.id }).catch(() => {
          throw new UnauthorizedException('User not found');
        });
        if (user.jwtKey !== payload.key) {
          throw new UnauthorizedException('Unauthorized');
        }
        return { jwtPayload: payload, user };
      case JwtTypeEnum.ApiToken:
        const apiToken = await this.apiTokenRepository.findOneOrFail({
          where: { id: payload.id },
          relations: { user: true },
        }).catch(() => {
          throw new UnauthorizedException('Api token not found');
        });
        return { jwtPayload: payload, apiToken, user: apiToken.user };
      default:
        throw new UnauthorizedException(`Invalid token type: ${payload.type satisfies never}`);
    }
  }
}
