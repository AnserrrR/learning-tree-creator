import { Query, Resolver } from '@nestjs/graphql';
import { Logger, UseGuards } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { JwtTypeGuard } from '../auth/guards/jwt-type.guard';
import { JwtTypeEnum } from '../auth/enums/jwt-type.enum';
import { UserRepository } from './user.repository';
import { CurrentAuth } from '../auth/decorators/current-auth.decorator';
import { JwtType } from '../auth/decorators/jwt-type.decorator';
import { ICurrentAuth } from '../auth/interfaces/current-auth.interface';

@Resolver()
@UseGuards(JwtTypeGuard)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Get current authorized user
   * @param auth - Current authorization
   * @returns Current DocuBackUserEntity
   */
  @Query(() => UserEntity, {
    description: 'Returns current authorized user',
  })
  @JwtType(JwtTypeEnum.UserAuthToken)
  async userCurrent(
    @CurrentAuth() auth: ICurrentAuth,
  ): Promise<UserEntity> {
    this.logger.log(`userCurrent: ${JSON.stringify(auth)}`);
    return this.userRepository.findByIdOrThrow(auth.user.id);
  }
}
