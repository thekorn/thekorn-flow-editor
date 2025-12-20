import { type Component, createSignal } from 'solid-js';
import { EdgesUI } from '../edges';
import { NodesUI } from '../nodes';
import type { Drag, Workflow } from '../types';
import { subVec } from '../utils';

const WorkflowEditor: Component<{ workflowConfig: Workflow }> = ({
  workflowConfig,
}) => {
  const [workflow, setWorkflow] = createSignal<Workflow>(workflowConfig);
  const [drag, setDrag] = createSignal<Drag>();

  const onMouseDown = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const nodeElement = targetElement.closest('[data-node]');
    if (nodeElement) {
      event.preventDefault();
      const mousePos = { x: event.clientX, y: event.clientY };
      const nodeBox = nodeElement.getBoundingClientRect();
      const posRelToNode = subVec(mousePos, nodeBox);
      setDrag({ id: nodeElement.id, posRelToNode });
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!drag()) return;
    setWorkflow((workflow) => {
      const draggedNode = drag();
      if (!draggedNode) return workflow;
      const node = workflow.nodes[draggedNode.id];
      if (!node) return workflow;

      const mousePos = { x: event.clientX, y: event.clientY };

      return {
        ...workflow,
        nodes: {
          ...workflow.nodes,
          [draggedNode.id]: {
            ...node,
            ...subVec(mousePos, draggedNode.posRelToNode),
          },
        },
      };
    });
  };

  const onMouseUp = () => {
    setDrag();
  };

  return (
    <div
      on:mousedown={onMouseDown}
      on:mouseup={onMouseUp}
      on:mousemove={onMouseMove}
      class="h-full bg-gray-100 bg-repeat"
      classList={{
        'bg-size-[50px_50px]': true,
        'bg-radial-[Circle_at_Center,var(--color-gray-300)_1px,transparent_2px]': true,
      }}
    >
      <NodesUI workflow={workflow} />
      <EdgesUI workflow={workflow} />
    </div>
  );
};

export default WorkflowEditor;
