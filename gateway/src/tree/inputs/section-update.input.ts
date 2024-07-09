import { InputType, IntersectionType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { TreeNode } from '../objects/tree-node.object';

@InputType()
export class SectionUpdateInput extends IntersectionType(
  PickType(TreeNode, ['id']),
  PartialType(OmitType(TreeNode, [
    'id',
    'positionX',
    'positionY',
    'tree',
  ])),
  InputType,
) {}
