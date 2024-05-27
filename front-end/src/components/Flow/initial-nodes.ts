import { Edge, MarkerType, Node, Position } from 'reactflow';
import { v4 } from 'uuid';


export const initialNodes: Node[] = [
  { id: v4(), position: { x: 0, y: 0 }, data: { label: 'Chapter 1' }, type: 'chapterNode'},
  { id: v4(), position: { x: 0, y: 100 }, data: { label: 'Chapter 2' }, type: 'chapterNode'},
];

export const initialEdges: Edge[] = [
  {
    id: v4(),
    source: initialNodes[0].id,
    target: initialNodes[1].id,
    sourceHandle: Position.Bottom,
    targetHandle: Position.Top,
    markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
  },
];
