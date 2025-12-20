import { type Accessor, type Component, For } from 'solid-js';
import type { Workflow } from '../types';
import NodeUI from './NodeUI';

const NodesUI: Component<{ workflow: Accessor<Workflow> }> = ({ workflow }) => {
  return (
    <For each={Object.values(workflow().nodes)}>
      {(node) => <NodeUI node={node} />}
    </For>
  );
};

export default NodesUI;
