import { Field, ObjectType } from '@nestjs/graphql';
import { AppBase } from '../../common/gql/app-base.object';

@ObjectType()
export class Tree extends AppBase {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
