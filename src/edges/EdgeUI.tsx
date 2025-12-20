import { type Accessor, type Component, createMemo } from 'solid-js';
import type { Edge, Node, Side, Vec, Workflow } from '../types';
import { addVec } from '../utils';

const EdgeUI: Component<{ edge: Edge; workflow: Accessor<Workflow> }> = ({
  workflow,
  edge,
}) => {
  function getPortPosition(node: Node, side: Side): Vec {
    switch (side) {
      case 'left':
        return addVec(node, { x: 0, y: node.height / 2 });
      case 'right':
        return addVec(node, { x: node.width, y: node.height / 2 });
      case 'top':
        return addVec(node, { x: node.width / 2, y: 0 });
      case 'bottom':
        return addVec(node, { x: node.width / 2, y: node.height });
    }
  }

  const pathDef = createMemo(() => {
    const from = workflow().nodes[edge.from];
    const fromPort = getPortPosition(from, edge.fromSide);
    const to = workflow().nodes[edge.to];
    const toPort = getPortPosition(to, edge.toSide);
    const result = `M ${fromPort.x} ${fromPort.y} L ${toPort.x} ${toPort.y}`;
    return result;
  });
  return (
    <g id={edge.id}>
      <path
        class="stroke-1 stroke-red-800"
        d={pathDef()}
        marker-end="url(#arrowHead)"
      />
    </g>
  );
};

export default EdgeUI;
