import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TreeGetFilteredInput {
  @Field(() => String, { nullable: true })
  name?: string;
}
