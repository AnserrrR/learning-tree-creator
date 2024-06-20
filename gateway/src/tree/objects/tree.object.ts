import { Field, ObjectType } from '@nestjs/graphql';
import { AppBaseObject } from '../../common/gql/app-base.object';
import { TreeNode } from './tree-node.object';

@ObjectType()
export class Tree extends AppBaseObject {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  authorId: string;

  userId: string;

  imageId: string;

  isPublic: boolean;

  chaptersCompiled: number;

  nodes: TreeNode[];
}
