import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLUUID } from 'graphql-scalars';
import { AppBaseObject } from '../../common/gql/app-base.object';

@ObjectType({ description: 'Token object' })
export class Token extends AppBaseObject {
  @Field(() => GraphQLUUID, { description: 'User id' })
  userId: string;

  @Field(() => String, { description: 'Token' })
  token: string;
}
