import { Field, ObjectType } from '@nestjs/graphql';
import { AppBaseObject } from '../../common/gql/app-base.object';

@ObjectType()
export class Tree extends AppBaseObject {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
