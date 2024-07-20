import {
  Field,
  InputType, IntersectionType, PartialType, PickType,
} from '@nestjs/graphql';
import { Tree } from '../objects/tree.object';
import { TreeNodeInput } from './tree-node.input';
import { EdgeInput } from './edge.input';

@InputType()
export class TreeUpdateInput extends IntersectionType(
  PickType(Tree, ['id']),
  PartialType(PickType(
    Tree,
    [
      'name',
      'description',
      'isPublic',
    ],
    InputType,
  )),
  InputType,
) {
  @Field(() => [TreeNodeInput])
  nodes: TreeNodeInput[];

  @Field(() => [EdgeInput])
  edges: EdgeInput[];
}
