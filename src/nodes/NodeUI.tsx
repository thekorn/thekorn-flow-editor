import type { Component } from 'solid-js';
import type { Node } from '../types';
import Port from './Port';

const NodeUI: Component<{ node: Node }> = ({ node }) => {
  return (
    <div
      id={node.id}
      data-node
      class="group cursor-move absolute justify-center items-center justify-items-center content-center text-center z-0"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        width: `${node.width}px`,
        height: `${node.height}px`,
      }}
    >
      <svg class="absolute top-0 left-0 w-full h-full overflow-visible stroke-gray-300 stroke-2 fill-white -z-10">
        <title>background</title>
        <rect
          x={0}
          y={0}
          width={node.width}
          height={node.height}
          ry={5}
          rx={5}
        />
      </svg>
      {node.title}
      <Port side="left" />
      <Port side="right" />
      <Port side="top" />
      <Port side="bottom" />
    </div>
  );
};

export default NodeUI;
