import { Field, ObjectType } from '@nestjs/graphql';
import { PositionEnum } from '../enums/position.enum';
import { GraphQLDateTimeISO } from 'graphql-scalars';
import { TreeNode } from './tree-node.object';

@ObjectType()
export class Edge {
  sourceId: string;

  targetId: string;

  source: TreeNode;

  target: TreeNode;

  sourcePosition: PositionEnum;

  targetPosition: PositionEnum;

  @Field(() => GraphQLDateTimeISO)
  createdAt: Date;

  @Field(() => GraphQLDateTimeISO)
  updatedAt: Date;

  @Field(() => GraphQLDateTimeISO, { nullable: true })
  deletedAt?: Date;
}
