import { ObjectType } from '@nestjs/graphql';
import { AppBaseObject } from '../../common/gql/app-base.object';
import { TreeNode } from './tree-node.object';

@ObjectType()
export class NodeLinkObject extends AppBaseObject {
  node: TreeNode;

  title: string;

  url: string;
}
