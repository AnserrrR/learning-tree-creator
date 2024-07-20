import { InputType, OmitType, PartialType, PickType, } from '@nestjs/graphql';
import { Edge } from '../objects/edge.object';

@InputType()
export class EdgeInput extends PickType(
  Edge,
  [
    'sourceId',
    'targetId',
    'sourcePosition',
    'targetPosition',
  ],
  InputType,
) {}
