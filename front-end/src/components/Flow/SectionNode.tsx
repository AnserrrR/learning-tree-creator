import { Handle, NodeProps, Position } from 'reactflow';
import Typography from '@mui/material/Typography';
import { INodeData } from './node-data.interface';
import NodeContent from './NodeContent';

const SectionNode = (props: NodeProps<INodeData>) => (
  <div
    className="react-flow__node-default"
    style={{
      padding: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      background: '#ffed59',
    }}>
    {
      Object.values(Position).map((value) => {
        if (props.targetPosition === value) return (
          <Handle
            id={value}
            key={value}
            position={value}
            type={'target'}
            style={{
              visibility: 'hidden',
            }}
          />
        );

        return (
          <Handle
            id={value}
            key={value}
            position={value}
            type={'source'}
          />
        );
      })
    }
    <NodeContent data={props.data} nodeType={SectionNode.name} />
  </div>
);
export default SectionNode;
