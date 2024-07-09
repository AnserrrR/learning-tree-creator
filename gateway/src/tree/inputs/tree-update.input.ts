import {
  InputType, IntersectionType, PartialType, PickType,
} from '@nestjs/graphql';
import { TreeCreateInput } from './tree-create.input';
import { Tree } from '../objects/tree.object';

@InputType()
export class TreeUpdateInput extends IntersectionType(
  PickType(Tree, ['id']),
  PartialType(TreeCreateInput),
  InputType,
) {}
