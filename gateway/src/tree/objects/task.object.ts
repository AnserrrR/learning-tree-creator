import { ObjectType } from '@nestjs/graphql';
import { AppBaseObject } from '../../common/gql/app-base.object';
import { TreeNode } from './tree-node.object';

@ObjectType()
export class TaskObject extends AppBaseObject {
  node: TreeNode;

  title: string;

  note: string;

  isComplete: boolean;
}
