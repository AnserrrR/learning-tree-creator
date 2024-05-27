import { Handle, NodeProps, Position } from 'reactflow';
import { INodeData } from './node-data.interface';
import NodeContent from './NodeContent';

const ChapterNode = (props: NodeProps<INodeData>) => (
  <div
    className="react-flow__node-default"
    style={{
      padding: '5px',
      border: '2px solid #ccc',
      borderRadius: '5px',
      background: '#fff',
    }}>
    <Handle
      id={Position.Top}
      position={Position.Top}
      type={'target'}
      style={{
        visibility: 'hidden',
      }}
    />
    <Handle
      id={Position.Bottom}
      position={Position.Bottom}
      type={'source'}
      style={{
        width: '10px',
        height: '5px',
        borderRadius: '2px',
      }}
    />
    <Handle id={Position.Left} position={Position.Left} type={'source'}/>
    <Handle id={Position.Right} position={Position.Right} type={'source'}/>
    <NodeContent data={props.data} nodeType={ChapterNode.name} />
  </div>
);
export default ChapterNode;
