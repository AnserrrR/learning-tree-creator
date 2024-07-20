import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { TreeNode } from '../objects/tree-node.object';

@InputType()
export class TreeNodeInput extends PickType(
  TreeNode,
  [
    'id',
    'label',
    'positionX',
    'positionY',

  ],
  InputType,
) {}
