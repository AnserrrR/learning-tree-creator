import crypto from 'crypto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import { IJwtPayloadCreate } from '../interfaces/jwt-payload.interface';
import { UserRoleEnum } from '../../user/enums/user-role.enum';
import { RemoteAuthService } from './remote-auth.service';
import { UserDocuBackEntity } from '../../user/entities/user-docu-back.entity';
import { ConfigService } from '../../../config/config.service';
import { JwtTypeEnum } from '../enums/jwt-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly remoteAuthService: RemoteAuthService,
    @InjectRepository(UserDocuBackEntity) private readonly userRepository: Repository<UserDocuBackEntity>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  /**
   * Generate JWT.
   * @param input - Payload for JWT.
   * @returns Encoded JWT.
   */
  public async generateAccessToken(input: IJwtPayloadCreate): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(input, this.configService.config.jwtToken.secret, {
        expiresIn: input.type === JwtTypeEnum.UserAuthToken
          ? this.configService.config.jwtToken.userTokenExpiresIn
          : this.configService.config.jwtToken.apiTokenExpiresIn,
      }, (error, encoded) => (encoded ? resolve(encoded) : reject(error)));
    });
  }

  /**
   * Generate random string for user's JWT generation.
   * This string saves into user's entity, and it's change performs user's logout.
   */
  public async generateJwtKey(): Promise<string> {
    return crypto.randomBytes(8).toString('hex');
  }

  /**
   * Login though remote auth service and upsert user in database.
   * @param login - User login.
   * @param password - User password.
   * @returns User entity.
   * @throws {RemoteAuthService.loginForAll} - Inherited exceptions
   */
  public async checkUserThoughRemoteAuth(
    { login, password }: { login: string, password: string },
  ): Promise<UserDocuBackEntity> {
    return this.remoteAuthService
      .loginForAll({ login, password })
      .then(async (res) => {
        // If auth success -> Upsert User in DB.
        const userEntity = await this.userRepository.findOneBy({ email: res.email }) || new UserDocuBackEntity();
        // Check password («bcrypt.compare» is lower cost for CPU than «bcrypt.hash»).
        if (!userEntity.password || !await bcrypt.compare(password, userEntity.password)) {
          // If password not match -> hash new password.
          userEntity.password = await bcrypt.hash(password, 10);
        }
        userEntity.email = res.email;
        userEntity.departments = res.departments;
        userEntity.jwtKey ??= await this.generateJwtKey();
        // TODO!!!: Когда в ответе будут группы пользователя, то роль будет определяться по ним.
        // 2023.11.14 По ролям пока нет разделения, все должны быть менеджерами
        userEntity.role ??= UserRoleEnum.Manager;
        return userEntity.save();
      });
  }

  /**
   * Check user though database. Also try handle remote auth error.
   * @param login - User login.
   * @param password - User password.
   * @returns UserEntity.
   * @throws NotFoundException - User not found.
   * @throws UnauthorizedException - Invalid password.
   */
  public async checkUserThoughDatabase(
    { login, password }: { login: string, password: string },
  ): Promise<UserDocuBackEntity> {
    const userEntity = await this.userRepository.findOneByOrFail({ email: login }).catch(() => {
      throw new NotFoundException('User not found');
    });
    if (!await bcrypt.compare(password, userEntity.password)) {
      // If login or password not match -> Unauthorized
      throw new UnauthorizedException();
    }
    if (!userEntity.jwtKey) {
      // If user don't have jwtKey -> generate it
      userEntity.jwtKey = await this.generateJwtKey();
      await userEntity.save();
    }
    return userEntity;
  }

  public async userLogout(userId: string) {
    const updateResult = await this.userRepository.update({ id: userId }, { jwtKey: await this.generateJwtKey() });
    if (!updateResult.affected) {
      throw new NotFoundException('User not found');
    }
  }
}
