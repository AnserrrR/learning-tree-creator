import { ObjectType } from '@nestjs/graphql';
import { TaskObject } from './task.object';
import { NodeFileObject } from './node-file.object';
import { NodeLinkObject } from './node-link.object';
import { AppBaseObject } from '../../common/gql/app-base.object';
import { Tree } from './tree.object';
import { PositionEnum } from '../enums/position.enum';
import { NodeTypeEnum } from '../enums/node-type.enum';

@ObjectType()
export class TreeNode extends AppBaseObject {
  label: string;

  description: string;

  positionX: number;

  positionY: number;

  isComplete: boolean;

  targetPosition: PositionEnum;

  nodeType: NodeTypeEnum;

  tree: Tree;

  tasks: TaskObject[];

  files: NodeFileObject[];

  links: NodeLinkObject[];
}
