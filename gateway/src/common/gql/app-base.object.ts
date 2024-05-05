import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLDateTimeISO, GraphQLUUID } from 'graphql-scalars';

@ObjectType()
export class AppBaseObject {
  @Field(() => GraphQLUUID)
  id: string;

  @Field(() => GraphQLDateTimeISO)
  createdAt: Date;

  @Field(() => GraphQLDateTimeISO)
  updatedAt: Date;

  @Field(() => GraphQLDateTimeISO, { nullable: true })
  deletedAt?: Date;
}
