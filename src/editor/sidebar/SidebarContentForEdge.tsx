import { type Accessor, type Component, createMemo } from 'solid-js';
import type { Edge, Selection } from '../../types';
import { useWorkflowContext } from '../store';
import DeleteButton from './DeleteButton';

const SidebarContentForEdge: Component<{
  selection: Accessor<Selection>;
}> = ({ selection }) => {
  const [workflow, setWorkflow] = useWorkflowContext();
  const edge = createMemo(() => {
    return workflow.edges[selection().id];
  });

  function updateEdge(partialEdge: Partial<Edge>) {
    setWorkflow((workflow) => ({
      ...workflow,
      edges: { ...workflow.edges, [edge().id]: { ...edge(), ...partialEdge } },
    }));
  }

  return (
    <>
      <h2 class="mb-4 border-gray-200 border-b pb-4 font-semibold text-xl">
        Edge
      </h2>
      <div class="mb-4 grid gap-3 border-gray-200 border-b pb-4 text-[0.9rem]">
        <label>
          <span>Title</span>
          <textarea
            rows={2}
            value={edge().title}
            autofocus
            class="overflow-hidden rounded border border-gray-200"
            on:input={(e) => updateEdge({ title: e.target.value || '' })}
          ></textarea>
        </label>
      </div>
      <div class="mt-4 grid">
        <DeleteButton />
      </div>
    </>
  );
};

export default SidebarContentForEdge;
