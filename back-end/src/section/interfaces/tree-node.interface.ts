import { PositionEnum } from '../enums/position.enum';
import { NodeTypeEnum } from '../enums/node-type.enum';

export interface ITreeNode {
  id: string;
  title: string;
  positionX: number;
  positionY: number;
  targetPosition: PositionEnum;
  nodeType: NodeTypeEnum;
  treeId: string;
}
