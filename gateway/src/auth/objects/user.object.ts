import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { UserRoleEnum } from '../enums/user-role.enum';
import { AppBaseObject } from '../../common/gql/app-base.object';

/**
 * User object
 */
@ObjectType({ description: 'User object' })
export class User extends AppBaseObject {
  @Field(() => GraphQLEmailAddress, { description: 'User email' })
  email: string;

  @Field(() => UserRoleEnum, { description: 'User role' })
  role: UserRoleEnum;
}
