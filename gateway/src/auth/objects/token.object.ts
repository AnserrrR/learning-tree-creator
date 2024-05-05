import { Field, ObjectType } from '@nestjs/graphql';
import { AppBaseObject } from '../../common/gql/app-base.object';
import { GraphQLUUID } from 'graphql-scalars';

@ObjectType({ description: 'Token object' })
export class Token extends AppBaseObject {
  @Field(() => GraphQLUUID, { description: 'User id' })
  userId: string;

  @Field(() => String, { description: 'Token' })
  token: string;
}
