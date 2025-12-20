import {
  type Accessor,
  type Component,
  createMemo,
  createSignal,
  For,
} from "solid-js";
import type { Drag, Edge, Node, Side, Vec, Workflow } from "./types";
import { addVec, subVec } from "./utils";

const EXAMPLE_WORKFLOW: Workflow = {
  nodes: {
    "node-1": {
      id: "node-1",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      title: "Node 1",
    },
    "node-2": {
      id: "node-2",
      x: 300,
      y: 200,
      width: 100,
      height: 100,
      title: "Node 2",
    },
    "node-3": {
      id: "node-3",
      x: 500,
      y: 100,
      width: 100,
      height: 100,
      title: "Node 3",
    },
  },
  edges: {
    "edge-1": {
      id: "edge-1",
      from: "node-1",
      to: "node-2",
      fromSide: "right",
      toSide: "left",
      title: "Edge 1",
    },
    "edge-2": {
      id: "edge-2",
      from: "node-2",
      to: "node-3",
      fromSide: "right",
      toSide: "left",
      title: "Edge 2",
    },
  },
};

const NodeUI: Component<{ node: Node }> = ({ node }) => {
  return (
    <div
      id={node.id}
      data-node
      class="group cursor-move absolute justify-center items-center justify-items-center content-center text-center rounded-md border-2 border-gray-500"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
        width: `${node.width}px`,
        height: `${node.height}px`,
      }}
    >
      {node.title}
      <Port side="left" />
      <Port side="right" />
      <Port side="top" />
      <Port side="bottom" />
    </div>
  );
};

const EdgesUI: Component<{ workflow: Accessor<Workflow> }> = ({ workflow }) => {
  return (
    <svg class="overflow-visible">
      <title>Workflow edges</title>
      <For each={Object.values(workflow().edges)}>
        {(edge) => <EdgeUI workflow={workflow} edge={edge} />}
      </For>
    </svg>
  );
};

const EdgeUI: Component<{ edge: Edge; workflow: Accessor<Workflow> }> = ({
  workflow,
  edge,
}) => {
  function getPortPosition(node: Node, side: Side): Vec {
    switch (side) {
      case "left":
        return addVec(node, { x: 0, y: node.height / 2 });
      case "right":
        return addVec(node, { x: node.width, y: node.height / 2 });
      case "top":
        return addVec(node, { x: node.width / 2, y: 0 });
      case "bottom":
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
      <path class="stroke-1 stroke-red-800" d={pathDef()} />
    </g>
  );
};

const Port: Component<{ side: Side }> = ({ side }) => {
  return (
    <div
      class="absolute w-5 h-5 border-[3px] rounded-full group-hover:opacity-100 opacity-0"
      classList={{
        "bg-radial-[Circle_at_Center,var(--color-red-700)_3px,transparent_4px]": true,
        "-left-[13px]": side === "left",
        "-right-[13px]": side === "right",
        "top-[calc(50%_-13px)]": side === "left" || side === "right",
        "-top-[13px]": side === "top",
        "-bottom-[13px]": side === "bottom",
        "left-[calc(50%_-13px)]": side === "top" || side === "bottom",
      }}
    />
  );
};

const WorkflowEditor: Component = () => {
  const [workflow, setWorkflow] = createSignal<Workflow>(EXAMPLE_WORKFLOW);
  const [drag, setDrag] = createSignal<Drag>();

  const onMouseDown = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const nodeElement = targetElement.closest("[data-node]");
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
        "bg-size-[50px_50px]": true,
        "bg-radial-[Circle_at_Center,var(--color-gray-300)_1px,transparent_2px]": true,
      }}
    >
      <For each={Object.values(workflow().nodes)}>
        {(node) => <NodeUI node={node} />}
      </For>
      <EdgesUI workflow={workflow} />
    </div>
  );
};

export default WorkflowEditor;
