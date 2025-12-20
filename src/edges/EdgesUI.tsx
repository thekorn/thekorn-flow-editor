import { type Accessor, type Component, For } from 'solid-js';
import type { Workflow } from '../types';
import EdgeMarker from './EdgeMarker';
import EdgeUI from './EdgeUI';

const EdgesUI: Component<{ workflow: Accessor<Workflow> }> = ({ workflow }) => {
  return (
    <svg class="overflow-visible">
      <defs>
        <EdgeMarker />
      </defs>
      <title>Workflow edges</title>
      <For each={Object.values(workflow().edges)}>
        {(edge) => <EdgeUI workflow={workflow} edge={edge} />}
      </For>
    </svg>
  );
};

export default EdgesUI;
