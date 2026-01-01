import { type Accessor, type Component, createMemo } from 'solid-js';
import type { Node, Selection } from '../../types';
import { useWorkflowContext } from '../store';
import DeleteButton from './DeleteButton';

const SidebarContentForNode: Component<{
  selection: Accessor<Selection>;
}> = ({ selection }) => {
  const [workflow, setWorkflow] = useWorkflowContext();
  const node = createMemo(() => {
    return workflow.nodes[selection().id];
  });

  function updateNode(partialNode: Partial<Node>) {
    setWorkflow((workflow) => ({
      ...workflow,
      nodes: { ...workflow.nodes, [node().id]: { ...node(), ...partialNode } },
    }));
  }

  return (
    <>
      <h2 class="mb-4 border-gray-200 border-b pb-4 font-semibold text-xl">
        Node
      </h2>
      <div class="mb-4 grid gap-3 border-gray-200 border-b pb-4 text-[0.9rem]">
        <label>
          <span>Title</span>
          <textarea
            rows={2}
            value={node().title}
            autofocus
            class="overflow-hidden rounded border border-gray-200"
            on:input={(e) => updateNode({ title: e.target.value || '' })}
          ></textarea>
        </label>
        <label>
          <span>Width</span>
          <input
            type="number"
            value={node().width}
            class="overflow-hidden rounded border border-gray-200"
            on:input={(e) => updateNode({ width: Number(e.target.value) })}
          ></input>
        </label>
        <label>
          <span>Height</span>
          <input
            type="number"
            value={node().height}
            class="overflow-hidden rounded border border-gray-200"
            on:input={(e) => updateNode({ height: Number(e.target.value) })}
          ></input>
        </label>
      </div>
      <div class="mt-4 grid">
        <DeleteButton />
      </div>
    </>
  );
};

export default SidebarContentForNode;
