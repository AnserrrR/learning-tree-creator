import {
  Background,
  BackgroundVariant,
  Controls, getConnectedEdges, getOutgoers,
  MarkerType,
  MiniMap, NodeChange,
  OnConnectEnd,
  OnConnectStart,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from 'reactflow';
import { useCallback, useMemo, useRef } from 'react';
import { v4 } from 'uuid';
import { initialEdges, initialNodes } from './initial-nodes';
import ChapterNode from './ChapterNode';
import SectionNode from './SectionNode';
import { isNil } from 'lodash';
import { INodeData } from './node-data.interface';

import 'reactflow/dist/style.css';

const Flow = () => {
  const [
    nodes,
    setNodes,
    onNodesChange,
  ] = useNodesState<INodeData>(initialNodes);
  const [
    edges,
    setEdges,
  ] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({
    chapterNode: ChapterNode,
    sectionNode: SectionNode,
  }), []);

  const connectingNodeProps = useRef<{
    nodeId: string | null;
    handleId: string | null;
  } | null>(null);
  const { screenToFlowPosition, getNode } = useReactFlow<INodeData>();

  const onConnectStart = useCallback<OnConnectStart>((_, { nodeId, handleId }) => {
    connectingNodeProps.current = { nodeId, handleId };
  }, []);

  const onConnectEnd = useCallback<OnConnectEnd>(
    (event) => {
      if (isNil(connectingNodeProps.current?.nodeId)) return;

      if (event instanceof TouchEvent) {
        return;
      }

      const targetIsPane =
        event.target instanceof HTMLElement
        && event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        const nodeId = v4();
        const edgeId = v4();
        const nodeProps = {
          id: nodeId,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
        };
        const edgeProps = {
          id: edgeId,
          source: connectingNodeProps.current!.nodeId!,
          target: nodeId,
          sourceHandle: connectingNodeProps.current!.handleId,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        }

        if (
          connectingNodeProps.current!.handleId === Position.Bottom
          && nodes.find((node) => node.id === connectingNodeProps.current!.nodeId)?.type === 'chapterNode'
        ) {
          setNodes((nds) => nds.concat({
            ...nodeProps,
            data: { label: `Chapter ${nodeId}` },
            type: 'chapterNode',
          }));
          setEdges((eds) =>
            eds.concat({
              ...edgeProps,
              targetHandle: Position.Top,
            }),
          );
          return;
        }

        const targetPosition = getTargetHandle(connectingNodeProps.current!.handleId as Position);


        setNodes((nds) => nds.concat({
          id: nodeId,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Section ${nodeId}` },
          targetPosition: targetPosition,
          type: 'sectionNode',
        }));
        setEdges((eds) =>
          eds.concat({
            ...edgeProps,
            targetHandle: targetPosition,
            style: { strokeDasharray: '5, 5'}
          }),
        );
      }
    },
    [nodes, screenToFlowPosition, setEdges, setNodes],
  );

  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === 'remove') {
        const node = getNode(change.id);

        if (node && !(getOutgoers(node, nodes, edges).length > 0)) {
          return [...acc, change];
        }

        return acc;
      }

      return [...acc, change];
    }, [] as NodeChange[])

    onNodesChange(nextChanges);
  }, [edges, getNode, nodes, onNodesChange]);

  return (
      <div className="tree-flow" style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onNodesChange={handleNodesChange}
          nodeTypes={nodeTypes}
          fitView={true}
          fitViewOptions={{ padding: 0.3 }}
          nodeOrigin={[0.5, 0.5]}
        >
          <Controls
            fitViewOptions={{ padding: 0.3 }}
          />
          <MiniMap/>
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
  );
}
export default Flow;

const getTargetHandle = (sourceHandle: Position): Position => {
  switch (sourceHandle) {
    case Position.Left:
      return Position.Right;
    case Position.Right:
      return Position.Left;
    case Position.Top:
      return Position.Bottom;
    case Position.Bottom:
      return Position.Top;
  }
}
