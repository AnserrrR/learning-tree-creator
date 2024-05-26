import {
  addEdge,
  Background,
  BackgroundVariant, Connection,
  Controls, Edge, Node,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState, Panel
} from 'reactflow';

import 'reactflow/dist/style.css';
import { useCallback } from 'react';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          fitView={true}
        >
          <Controls/>
          <MiniMap/>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
  );
}
export default Flow;
