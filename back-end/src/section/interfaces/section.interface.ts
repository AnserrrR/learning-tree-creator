import { ITreeNode } from './tree-node.interface';

export interface ISection extends ITreeNode {
  description: string;

  isComplete: boolean;
}
