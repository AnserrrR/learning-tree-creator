import { Field, ObjectType } from '@nestjs/graphql';
import { TreeNode } from './tree-node.object';
import { GraphQLDateTimeISO } from 'graphql-scalars';

@ObjectType()
export class NodeFileObject {
  nodeId: string;

  fileId: string;

  node: TreeNode;

  fullName: string;

  isImage: boolean;

  @Field(() => GraphQLDateTimeISO)
  createdAt: Date;

  @Field(() => GraphQLDateTimeISO)
  updatedAt: Date;

  @Field(() => GraphQLDateTimeISO, { nullable: true })
  deletedAt?: Date;
}
