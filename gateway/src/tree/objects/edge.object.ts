import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLDateTimeISO } from 'graphql-scalars';
import { PositionEnum } from '../enums/position.enum';
import { TreeNode } from './tree-node.object';
import { Tree } from './tree.object';

@ObjectType()
export class Edge {
  sourceId: string;

  targetId: string;

  source: TreeNode;

  target: TreeNode;

  sourcePosition: PositionEnum;

  targetPosition: PositionEnum;

  tree: Tree;

  @Field(() => GraphQLDateTimeISO)
  createdAt: Date;

  @Field(() => GraphQLDateTimeISO)
  updatedAt: Date;

  @Field(() => GraphQLDateTimeISO, { nullable: true })
  deletedAt?: Date;
}
