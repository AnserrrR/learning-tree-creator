import { InputType, PickType } from '@nestjs/graphql';
import { Tree } from '../objects/tree.object';

@InputType()
export class TreeCreateInput extends PickType(
  Tree,
  [
    'name',
    'description',
  ],
  InputType,
) {}
