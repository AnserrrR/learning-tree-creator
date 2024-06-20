import { ITreeNode } from '../../section/interfaces/tree-node.interface';
import { IEdge } from '../../section/interfaces/edge-interface';

export interface ITreeCreate {
  name: string;
  description: string;
  nodes: ITreeNode[];
  edges: IEdge[];
}
