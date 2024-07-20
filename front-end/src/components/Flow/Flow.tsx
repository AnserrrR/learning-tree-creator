import {
  Background,
  BackgroundVariant,
  Controls,
  getOutgoers,
  MarkerType,
  MiniMap,
  NodeChange,
  OnConnectEnd,
  OnConnectStart,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow
} from 'reactflow';
import React, { useCallback, useMemo, useRef } from 'react';
import { v4 } from 'uuid';
import { initialEdges, initialNodes } from './initial-nodes';
import ChapterNode from './ChapterNode';
import SectionNode from './SectionNode';
import { isNil } from 'lodash';
import { INodeData } from './node-data.interface';
import { PositionEnum, useGetTreeByIdQuery, useUpdateTreeMutation } from '../../api/generated/graphql';
import TreePanel from './TreePanel';
import { useParams } from 'react-router-dom';

import 'reactflow/dist/style.css';

/**
 * Flow component
 */
const Flow = () => {
  // Get tree by id
  const { treeId} = useParams()

  const Tree = useGetTreeByIdQuery({
    variables: {
      id: treeId,
    },
  }).data?.getTreeById;
  console.log(Tree);


  // Nodes and edges state
  const [
    nodes,
    setNodes,
    onNodesChange,
  ] = useNodesState<INodeData>(initialNodes);
  const [
    edges,
    setEdges,
  ] = useEdgesState(initialEdges);

  // Node types
  const nodeTypes = useMemo(() => ({
    chapterNode: ChapterNode,
    sectionNode: SectionNode,
  }), []);

  // Count sections and chapters
  const [sectionsCount, chaptersCount] = useMemo(() => {
    const sections = nodes.filter((node) => node.type === 'sectionNode');
    const chapters = nodes.filter((node) => node.type === 'chapterNode');
    return [sections.length, chapters.length];
  }, [nodes]);

  // Connecting node props
  const connectingNodeProps = useRef<{
    nodeId: string | null;
    handleId: string | null;
  } | null>(null);

  // React Flow hooks
  const { screenToFlowPosition, getNode } = useReactFlow<INodeData>();

  // On connect start
  const onConnectStart = useCallback<OnConnectStart>((_, { nodeId, handleId }) => {
    connectingNodeProps.current = { nodeId, handleId };
  }, []);

  // On connect end. Create new section or chapter node
  const onConnectEnd = useCallback<OnConnectEnd>(
    (event) => {
      const sourceNodeId = connectingNodeProps.current?.nodeId;
      const sourceHandleId = connectingNodeProps.current?.handleId;

      if (isNil(sourceNodeId)) return;

      if (event instanceof TouchEvent) return;

      const targetIsPane =
        event.target instanceof HTMLElement
        && event.target.classList.contains('react-flow__pane');

      if (!targetIsPane) return;

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
        source: sourceNodeId,
        target: nodeId,
        sourceHandle: sourceHandleId,
        markerEnd: {type: MarkerType.Arrow, height: 20, width: 20},
      }

      // Create chapter node
      if (
        sourceHandleId === Position.Bottom
        && nodes.find((node) => {
          return node.id === sourceNodeId;
        })?.type === 'chapterNode'
      ) {
        // Prevent creating multiple chapters from the same chapter
        if (edges.some((edge) => {
          return edge.source === sourceNodeId
            && edge.sourceHandle === Position.Bottom;
        })) return;

        setNodes((nds) => nds.concat({
          ...nodeProps,
          data: {label: `Chapter ${chaptersCount + 1}`},
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

      // Create section node
      const targetPosition = getTargetHandle(sourceHandleId as Position);
      setNodes((nds) => nds.concat({
        id: nodeId,
        position: screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        }),
        data: {label: `Section ${sectionsCount + 1}`},
        targetPosition: targetPosition,
        type: 'sectionNode',
      }));
      setEdges((eds) =>
        eds.concat({
          ...edgeProps,
          targetHandle: targetPosition,
          style: {strokeDasharray: '5, 5'}
        }),
      );
    },
    [screenToFlowPosition, nodes, setNodes, setEdges, edges, chaptersCount, sectionsCount],
  );

  // Handle nodes change. Remove node if it has no outgoers
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    const nextChanges = changes.reduce((acc, change) => {
      if (change.type === 'remove') {
        const node = getNode(change.id);

        if (node && !(getOutgoers(node, nodes, edges).length > 0)) {
          // Remove connected edges
          setEdges((eds) => {
            return eds.filter((edge) => edge.target !== change.id);
          });

          return [...acc, change];
        }

        return acc;
      }

      return [...acc, change];
    }, [] as NodeChange[])

    onNodesChange(nextChanges);
  }, [edges, getNode, nodes, onNodesChange, setEdges]);

  // Save tree
  const [ updateTreeMutation  ]  = useUpdateTreeMutation();

  const onSave = useCallback(() => {
    updateTreeMutation({
      variables: {
        input: {
          id: treeId,
          nodes: nodes.map((node) => {
            return {
              id: node.id,
              label: node.data.label,
              positionX: node.position.x,
              positionY: node.position.y,
            }
          }),
          edges: edges.map((edge) => {
            return {
              id: edge.id,
              sourceId: edge.source,
              targetId: edge.target,
              sourcePosition: edge.sourceHandle as PositionEnum,
              targetPosition: edge.targetHandle as PositionEnum,
            }
          }),
        }
      }
    })
  }, []);

  return (
      <div className="tree-flow" style={{ width: '100vw', height: '100vh' }}>
        <TreePanel />
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

/**
 * Get target handle
 * @param sourceHandle Source handle position
 */
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
